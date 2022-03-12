import React from "react";
import styles from "../styles/Card.module.css";
import RestaurantType from "../types";
import { BiLogIn } from "react-icons/bi";
function Food({
  item,
  openModal,
}: {
  item: RestaurantType;
  openModal: (val: RestaurantType) => void;
}) {
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

        <p className={styles.statusDesc}>{item.statusDesc}</p>
      </div>
      <img className={styles.image} src={item.image_url} />
    </div>
  );
}

export default Food;
