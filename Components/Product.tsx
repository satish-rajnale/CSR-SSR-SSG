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
      style={isSidebarList && { minHeight: "100px" }}
    >
      <div
        className={styles.content}
        style={isSidebarList && { padding: 0, justifyContent: "space-evenly" }}
      >
        <div
          className={styles.category}
          data-testid={`card-category`}
          style={isSidebarList && { position: "relative" }}
        >
          <BiFoodTag color={item.category == "veg" ? "green" : "red"} />
        </div>
        <h4 className={styles.name} style={isSidebarList && { width: "120px" }}>
          {item.name}
        </h4>

        {!isSidebarList && <h4 className={styles.price}>₹{item.price}</h4>}

        {withRemoveBtn ? (
          <span onClick={() => dispatch(deleteRecord({ id: item.id }))}>
            <MdDelete color="red" />
          </span>
        ) : null}
        {!isSidebarList && (
          <p className={styles.statusDesc}>{item.statusDesc}</p>
        )}
      </div>
      <div>
        {!isSidebarList && (
          <img className={styles.image} src={item.image_url} />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            right: !isSidebarList && "-10%",
            width: "fit-content",
            border: "1px solid black",
            bottom: !isSidebarList && 26,
          }}
        >
          <div
            className={styles.button}
            style={isSidebarList && { width: "30px", height: "30px" }}
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
            style={isSidebarList && { width: "30px", height: "30px" }}
          />
          <div
            className={styles.button}
            style={isSidebarList && { width: "30px", height: "30px" }}
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
