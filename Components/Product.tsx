import React from "react";
import styles from "../styles/Card.module.css";
import RestaurantType from "../types";
import { BiFoodTag } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { useEffect, useState } from "react";
import {
  deleteRecord,
  incrementCartCount,
  reduceCartCount,
} from "../store/restaurantReducer";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import Image from "next/image";

function Food({
  item,
  withRemoveBtn,
  isSidebarList,
}: {
  item: RestaurantType;
  withRemoveBtn: boolean;
  isSidebarList: boolean;
}) {
  const [productCount, setProductCount] = useState("0");
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    /*@ts-ignore*/
    state.cart.filter((obj) => obj.id == item.id)
  );

  useEffect(() => {
    if (product.length != 0) {
      setProductCount(product[0].count);
    } else {
      setProductCount("0");
    }
  }, [product]);

  function updateCartCount() {}
  return (
    <div
      className={styles.card}
      style={isSidebarList ? { minHeight: "100px" } : { minHeight: "auto" }}
    >
      <div
        className={styles.content}
        style={
          isSidebarList
            ? { padding: 0, justifyContent: "space-evenly" }
            : { padding: "10px" }
        }
      >
        <div
          className={styles.category}
          data-testid={`card-category`}
          style={
            isSidebarList ? { position: "relative" } : { display: "block" }
          }
        >
          <BiFoodTag color={item.category == "veg" ? "green" : "red"} />
        </div>
        <h4
          className={styles.name}
          style={isSidebarList ? { width: "120px" } : { display: "flex" }}
        >
          {item.name}
        </h4>

        {!isSidebarList && <h4 className={styles.price}>₹{item.price}</h4>}

        {withRemoveBtn ? (
          <div onClick={() => dispatch(deleteRecord({ id: item.id }))}>
            <MdDelete color="red" />
          </div>
        ) : null}
        {!isSidebarList && (
          <p className={styles.statusDesc}>{item.statusDesc}</p>
        )}
      </div>
      <div>
        {!isSidebarList && (
          <img className={styles.image} src={item.image_url} alt="food" />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            right: !isSidebarList ? "-10%" : "auto",
            width: "fit-content",
            border: "1px solid black",
            bottom: !isSidebarList ? 26 : "auto",
          }}
        >
          <div
            className={styles.button}
            style={
              isSidebarList
                ? { width: "30px", height: "30px" }
                : { display: "flex" }
            }
            onClick={() => {
              // dispatch({
              //   type: "REDUCE_COUNT",
              //   id: item.id,
              // });
              // dispatch({
              //   type: "SET_SUBTOTAL",
              // });
              // updateCartCount();
              dispatch(incrementCartCount({ id: item.id }));
            }}
          >
            <AiOutlinePlus color="rgb(97, 197, 57)" />
          </div>
          <input
            className={styles.input}
            value={String(productCount)}
            style={
              isSidebarList
                ? { width: "30px", height: "30px" }
                : { color: "#000" }
            }
            onChange={(e) => setProductCount(e.target.value)}
          />
          <div
            className={styles.button}
            style={
              isSidebarList
                ? { width: "30px", height: "30px" }
                : { alignItems: "center" }
            }
            onClick={() => {
              updateCartCount();
              // dispatch({
              //   type: "INCREMENT_COUNT",
              //   id: item.id,
              // });
              // dispatch({
              //   type: "SET_SUBTOTAL",
              // });
              dispatch(reduceCartCount({ id: item.id }));
            }}
          >
            <AiOutlineMinus />
          </div>
        </div>
      </div>
      {isSidebarList && <h4 className={styles.price}>₹{item.price}</h4>}
    </div>
  );
}

export default Food;
