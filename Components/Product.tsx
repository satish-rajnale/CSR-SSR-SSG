import React from "react";
import styles from "../styles/Card.module.css";
import RestaurantType from "../types";
import { BiLogIn } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { useEffect, useState } from "react";

import { ReactReduxContext, useDispatch, useSelector } from "react-redux";

function Food({
  item,
  openModal,
  withclosebutton,
}: {
  item: RestaurantType;
  openModal: (val: RestaurantType) => void;
  withclosebutton: boolean;
}) {
  const [productCount, setProductCount] = useState("0");
  const dispatch = useDispatch();
  const store = useSelector((state) => state.allData);

  console.log(store);
  // useEffect(() => {
  //   if (store.length != 0) {
  //     setProductCount(store[0].count);
  //   }
  // }, [store]);

  function updateCartCount() {}
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.category} data-testid={`card-category`}>
          <BiLogIn />
        </div>
        <h4 className={styles.name}>{item.name}</h4>

        <p className={styles.price}>₹{item.price}</p>

        {/* <button
          className={styles.btnContainer}
          data-testid={`card-button-${item.id}`}
          onClick={() => openModal(item)}
        >
          EDIT
        </button> */}
        {withclosebutton ? (
          <button className={styles.button} onClick={() => {}}>
            <BiLogIn />
          </button>
        ) : null}
        <p className={styles.statusDesc}>{item.statusDesc}</p>
      </div>
      <div>
        <img className={styles.image} src={item.image_url} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            right: "-10%",
            width: "fit-content",
            border: "1px solid black",
            bottom: 26,
          }}
        >
          <div
            className={styles.button}
            onClick={() => {
              dispatch({
                type: "REDUCE_COUNT",
                id: item.id,
              });
              dispatch({
                type: "SET_SUBTOTAL",
              });
              updateCartCount();
            }}
          >
            <AiOutlinePlus />
          </div>
          <input className={styles.input} value={String(productCount)} />
          <div
            className={styles.button}
            onClick={() => {
              updateCartCount();
              dispatch({
                type: "INCREMENT_COUNT",
                id: item.id,
              });
              dispatch({
                type: "SET_SUBTOTAL",
              });
            }}
          >
            <AiOutlineMinus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
