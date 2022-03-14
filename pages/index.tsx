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

import { FiXSquare } from "react-icons/fi";
import { BsPatchPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addRestoData } from "../store/foodReducerStore";
import Pagination from "../Containers/Pagination";
import fetchRestaurants, {
  fetchNextRestaurantsList,
} from "../services/fetchData";
import fetchReducer, { initialState } from "../Reducers/foodlistReducer";

import Header from "../Components/Header";
import Link from "next/link";
import Food from "../Components/Food";
let initialized = false;
const Home: NextPage = () => {
  const [appState, dispatchToReducer] = useReducer(fetchReducer, initialState);
  const storedata: any = useSelector((state) => state);
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
        const [last, data] = fetchedData.data;
        await dispatch(addRestoData({ allData: data, LastDoc: last }));
        await dispatchToReducer({
          type: "success",
          payload: { List: data, LastDoc: last },
        });
      }
    }
    if (!initialized) {
      fetchData();
      initialized = true;
    }
  }, []);

  useEffect(() => {
    dispatchToReducer({
      type: "updatedList",
      payload: { List: storedata.allData, LastDoc: storedata.LastDoc },
    });
  }, [storedata]);

  console.log("appstate", appState);
  console.log("cartstate", storedata);
  const handleFetchNext = async () => {
    const fetchedData = await fetchNextRestaurantsList(appState.lastDoc);
    console.log("next", fetchedData);
    if (typeof fetchedData == "string") {
      dispatchToReducer({
        type: "error",
        payload: { errorMsg: fetchedData },
      });
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
                  data={storedata.allData}
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
                {storedata.cart.map((obj, index) => {
                  let item = storedata.allData.find(
                    (obj1) => obj1.id == obj.id
                  );
                  console.log("item created", item);
                  return (
                    <Food
                      key={index}
                      item={item}
                      isSidebarList={true}
                      withRemoveBtn={false}
                    />
                  );
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
            <Link href={"/cart"} passHref>
              <button className={styles.checkoutBtn}>Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
