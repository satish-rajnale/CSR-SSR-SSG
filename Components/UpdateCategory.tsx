import React from "react";
import Modal from "./MOdal";
import styles from "../styles/home.module.css";
function UpdateCategory({
  dispatchToCategoryReducer,
  handleAddCategory,
  handleItemCategory,
  categoryState,
}) {
  return (
    <Modal
      closeModal={() => dispatchToCategoryReducer({ type: "closeMOdal" })}
      modalIsOpen={categoryState.modalIsOpen}
    >
      {categoryState.isAddCategory ? (
        <>
          <h2>Create a Category</h2>

          <div style={{ display: "flex" }}>
            <input
              className={styles.searchInput}
              value={categoryState.newCategory}
              data-testid="input-category"
              placeholder="add new category"
              onChange={({ target }) =>
                dispatchToCategoryReducer({
                  type: "addnew",
                  payload: { newCategory: target.value },
                })
              }
            />
            <button
              className={styles["card-button"]}
              data-testid={`card-button-${categoryState.newCategory}`}
              style={{ fontSize: 22, height: "inherit", marginLeft: 10 }}
              onClick={handleAddCategory}
            >
              Add New Category
            </button>
          </div>
          {categoryState.error && (
            <p style={{ color: "red", margin: 0 }}>{categoryState.errorMsg}</p>
          )}
        </>
      ) : categoryState.selectedresto != "" ? (
        <>
          <h2>{categoryState.selectedresto.name}</h2>
          <p style={{ marginBottom: 3 }}>Select from available categories</p>
          <div style={{ display: "flex" }}>
            <div className={styles.selectContainer}>
              <select
                placeholder="Select"
                data-testid="select-category"
                value={categoryState.selectedCategory}
                className={styles.selectSearch}
                onChange={({ target }) =>
                  dispatchToCategoryReducer({
                    type: "update",
                    payload: { category: target.value },
                  })
                }
              >
                <option className={styles.searchOption} value={""}>
                  select
                </option>
                {categoryState.categories.map((ct, idx) => (
                  <option
                    className={styles.searchOption}
                    value={ct.name}
                    key={idx}
                  >
                    {ct.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className={styles["card-button"]}
              data-testid="update-category"
              style={{ fontSize: 22, height: "inherit", marginLeft: 10 }}
              onClick={handleItemCategory}
            >
              Update category
            </button>
          </div>
        </>
      ) : (
        <h2>Nothing to show</h2>
      )}
    </Modal>
  );
}

export default UpdateCategory;
