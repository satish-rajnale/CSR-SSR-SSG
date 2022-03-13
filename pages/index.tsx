import type { NextPage } from "next";
import Head from "next/head";
import React, {
  SyntheticEvent,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import styles from "../styles/Home.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../functions/Firebase.prod";
import { FiXSquare } from "react-icons/fi";
import { BsPatchPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addRestoData } from "../store/restaurantReducer";
import Pagination from "../Containers/Pagination";
import fetchRestaurants, {
  fetchNextRestaurantsList,
  updateRestaurantCategory,
} from "../services/fetchData";
import UpdateCategory from "../Components/UpdateCategory";
import fetchReducer, { initialState } from "../Reducers/restaurantlistReducer";
import categoryReducer, {
  initialStateCategory,
} from "../Reducers/categoriesReducer";
import { BiLogOut } from "react-icons/bi";
import RestaurantType from "../types";
import Header from "../Components/Header";
import Link from "next/link";
import Food from "../Components/Product";
const Home: NextPage = () => {
  const [appState, dispatchToReducer] = useReducer(fetchReducer, initialState);
  const [categoryState, dispatchToCategoryReducer] = useReducer(
    categoryReducer,
    initialStateCategory
  );
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("name");
  const [filterByctg, setFilterByctg] = useState<string>("");

  const storedata: any = useSelector((state) => state);
  const searchValLength: number = searchVal.length;

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchRestaurants();
      // const fetchedData = await fetch(`/api/postdatatodb`);
      if (typeof fetchedData == "string") {
        dispatchToReducer({
          type: "error",
          payload: { errorMsg: fetchedData },
        });
      } else {
        const [last, data, categoryList] = fetchedData.data;
        await dispatch(addRestoData({ allData: data, LastDoc: last }));
        await dispatchToReducer({
          type: "success",
          payload: { List: data, LastDoc: last },
        });
        dispatchToCategoryReducer({
          type: "success",
          payload: { List: categoryList },
        });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatchToReducer({
      type: "updatedList",
      payload: { List: storedata.allData, LastDoc: storedata.LastDoc },
    });
  }, [storedata]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const handleSearchBy = (val: string) => {
    setSearchBy(val);
    setSearchVal("");
  };

  const handleFetchNext = async () => {
    const fetchedData = await fetchNextRestaurantsList(appState.lastDoc);
    if (typeof fetchedData == "string") {
      // dispatchToReducer({
      //   type: "error",
      //   payload: { errorMsg: fetchedData },
      // });
    } else {
      const [last, data] = fetchedData.data;
      const allData = [...storedata.allData].concat(data);
      dispatchToReducer({
        type: "updatedList",
        payload: { List: allData, LastDoc: last },
      });

      dispatch(addRestoData({ LastDoc: last, allData: allData }));
    }
  };

  const filteredData = useMemo(() => {
    let filteredData: RestaurantType[] = [];
    if (searchVal != "" && searchVal.length > 3) {
      filteredData = storedata.allData.filter((obj) => {
        let isArray = Array.isArray(obj[searchBy]);
        if (isArray) {
          let index = obj[searchBy].findIndex((e) =>
            e.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
          );

          if (index !== -1) {
            return obj;
          }
        } else if (
          obj[searchBy]
            .toLocaleLowerCase()
            .includes(searchVal.toLocaleLowerCase())
        ) {
          return obj;
        }
      });
    }

    return filteredData;
  }, [searchVal, searchBy]);

  const filterDataByCtg = useMemo(() => {
    let filteredData: RestaurantType[] = [];
    if (filterByctg != "") {
      filteredData = storedata.allData.filter((obj) => {
        if (obj.category == filterByctg) {
          return obj;
        }
      });
    }

    return filteredData;
  }, [filterByctg]);

  useEffect(() => {
    if (filteredData.length > 0 && searchVal.length > 3) {
      dispatchToReducer({
        type: "updatedList",
        payload: { List: filteredData },
      });
    } else if (filterByctg !== "") {
      dispatchToReducer({
        type: "updatedList",
        payload: { List: filterDataByCtg },
      });
    } else {
      dispatchToReducer({
        type: "updatedList",
        payload: { List: storedata.allData },
      });
    }
  }, [filteredData, filterDataByCtg]);

  function signOutUser() {
    signOut(auth);
  }
  function resetFilters() {
    setSearchVal("");
    setFilterByctg("");
  }
  const handleItemCategory = async (val) => {
    await updateRestaurantCategory(
      categoryState.selectedresto,
      categoryState.selectedCategory
    );

    await dispatchToCategoryReducer({
      type: "closeMOdal",
    });
  };
  const handleAddCategory = async () => {
    let addFlag = await fetchNextRestaurantsList(
      null,
      categoryState.newCategory
    );
    if (!addFlag) {
      dispatchToCategoryReducer({
        type: "error",
        payload: { errorMsg: "Category already exists" },
      });
    } else {
      const newList = [...categoryState.categories].concat([
        {
          name: categoryState.newCategory,
          ids: [],
        },
      ]);
      dispatchToCategoryReducer({
        type: "closeMOdal",
        payload: { newList: newList },
      });
    }
  };

  const modalObj = {
    dispatchToCategoryReducer,
    handleAddCategory,
    handleItemCategory,
    categoryState,
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Restaurento</title>
        <meta name="description" content="Created by satish" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Roboto+Condensed:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div style={{ position: "fixed" }}>
        <Link href={"/cart"}>
          <button
            type="button"
            className={styles.logoutBtn}
            // onClick={signOutUser}
          >
            <span className={styles.button__text}> Go to CArt</span>
            <span className={styles.button__icon}>
              <BiLogOut />
            </span>
          </button>
        </Link>
      </div>

      <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.centerContent}>
            <Header />

            {appState.loading ? (
              <div className={styles.withoutContent}>Loading...</div>
            ) : appState.error ? (
              <div className={styles.withoutContent}>Error...</div>
            ) : (
              <>
                <Pagination
                  data={appState.restaurantList}
                  filterByctg={filterByctg}
                  searchValLength={searchValLength}
                  openModal={(val: RestaurantType) =>
                    dispatchToCategoryReducer({
                      type: "openMOdal",
                      payload: { resto: val },
                    })
                  }
                  handleFetchNext={handleFetchNext}
                  pageLimit={3}
                  dataLimit={3}
                />
              </>
            )}
          </div>
          <div className={styles.sideBar}>
            <div
              style={{
                alignItems: "flex-start",
                padding: "5px",
                width: "100%",
              }}
            >
              <h1 style={{ paddingLeft: "20px", margin: 0, color: "#000" }}>
                Cart
              </h1>
              <h5 style={{ paddingLeft: "20px", margin: 0, color: "grey" }}>
                {storedata.cart.length} ITEMS
              </h5>
              <div
                style={{
                  alignItems: "center",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {storedata.cart.map((obj) => {
                  let item = storedata.allData.find(
                    (obj1) => obj1.id == obj.id
                  );
                  return <Food item={item} isSidebarList={true} />;
                })}
              </div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  alignItems: "center",
                }}
              >
                <h3>Subtotal:</h3>
                <h3>₹ {storedata.subtotal}</h3>
              </div>
            </div>
            <button className={styles.checkoutBtn}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
