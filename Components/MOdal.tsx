import React from "react";
import styles from "../styles/modal.module.css";
export default function Modal({ closeModal, modalIsOpen, children }) {
  return (
    <div>
      {modalIsOpen && (
        <>
          <div className={styles.container}>
            <a href="#" className={styles.close} onClick={closeModal}></a>
            {children}
          </div>
          <div
            className={styles.overley}
            data-testid="modal-overley"
            onClick={closeModal}
          ></div>
        </>
      )}
    </div>
  );
}
