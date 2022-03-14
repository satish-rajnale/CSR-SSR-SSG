import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import Food from "../../Components/Product";
import { destroyCart } from "../../store/restaurantReducer";
import styles from "../../styles/Cart.module.css";

const Cart: NextPage = () => {
  const [productList, setProductList] = useState([]);
  const [discount, setdiscount] = useState(0);
  const dispatch = useDispatch();
  /*@ts-ignore*/
  const cart = useSelector((state) => state.cart);
  /*@ts-ignore*/
  const mainData = useSelector((state) => state.allData);
  /*@ts-ignore*/
  const subtotal = useSelector((state) => state.subtotal);
  useEffect(() => {
    const prodList = [];
    for (let obj of mainData) {
      for (let cartObj of cart) {
        if (cartObj.id == obj.id && cartObj.count != 0) {
          prodList.push(obj);
        }
      }
    }

    setProductList(prodList);
    //   setloading(false);
    //   setsubTotal(gettotal);
  }, [cart, mainData]);

  useEffect(() => {
    if (subtotal <= 100) {
      setdiscount(0);
    } else if (subtotal > 100 && subtotal <= 500) {
      setdiscount((subtotal * 10) / 100);
    } else {
      setdiscount((subtotal * 20) / 100);
    }
  }, [subtotal]);

  function submitCartAndBacktoHome() {
    dispatch(destroyCart({}));
    window.location.href = "/";
  }
  console.log(cart, productList);
  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          <Link href={"/"} passHref>
            <button
              type="button"
              className={styles.logoutBtn}
              // onClick={signOutUser}
            >
              <span className={styles.button__text}>go back</span>
              <span className={styles.button__icon}>
                <BiLogOut />
              </span>
            </button>
          </Link>
        </div>
        <div className={styles.centerContent}>
          {productList.length > 0 ? (
            productList.map((item, index) => (
              <Food
                key={index}
                item={item}
                withRemoveBtn={true}
                isSidebarList={false}
              />
            ))
          ) : (
            <h1>NO ITEMS IN CART</h1>
          )}
        </div>
        <div style={{ marginLeft: "50px" }}>
          <div className={styles.summary}>
            <div className={styles.flexed}>
              {" "}
              <h3>Subtotal:</h3> <h3>₹{subtotal}</h3>
            </div>
            <div className={styles.flexed}>
              {" "}
              <h3>Discount:</h3> <h3>- ₹{discount}</h3>
            </div>
            <div className={styles.flexed}>
              {" "}
              <h3>Shipping Charges:</h3> <h3>Free</h3>
            </div>
            <div className={styles.flexed}>
              {" "}
              <h3>Total:</h3> <h3>₹{subtotal - discount}</h3>
            </div>
          </div>
          <button className={styles.cartBtn} onClick={submitCartAndBacktoHome}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
