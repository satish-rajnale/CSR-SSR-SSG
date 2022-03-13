import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Food from "../Components/Product";
import styles from "../styles/CArt.module.css";

const cart = () => {
  const [productList, setProductList] = useState([]);
  const [discount, setdiscount] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const mainData = useSelector((state) => state.allData);
  const subtotal = useSelector((state) => state.subtotal);
  useEffect(() => {
    if (cart.length != 0) {
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
    } else {
      //   setloading(false);
    }
  }, [cart, mainData]);

  console.log(cart);
  useEffect(() => {
    if (subtotal <= 100) {
      setdiscount(0);
    } else if (subtotal > 100 && subtotal <= 500) {
      setdiscount((subtotal * 10) / 100);
    } else {
      setdiscount((subtotal * 20) / 100);
    }
  }, [subtotal]);

  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <div style={{ position: "fixed", top: 0, left: 0 }}>
          <Link href={"/"}>
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
          {productList.map((item, index) => (
            <Food key={index} item={item} />
          ))}
        </div>
        <div>
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
          <button className={styles.cartBtn}>Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
};

export default cart;
