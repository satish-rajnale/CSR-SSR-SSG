import { DocumentSnapshot } from "firebase/firestore";
import RestaurantType from "../types";

const fetchRestaurants = async () => {
  let data;
  data = await fetch(`/api/getrestaurants`)
    .then((res: Response) => res.json())
    .catch((reason) => {
      console.log("err", reason);
      return "Something went wrong!";
    });
  return data;
};

export const fetchNextRestaurantsList = async (
  lastDoc: DocumentSnapshot,
  name?: string
) => {
  let data;
  let bodyData = {};
  if (lastDoc) {
    bodyData = { lastDoc };
  } else {
    bodyData = { name };
  }
  data = await fetch(`/api/getrestaurants`, {
    method: "POST",
    body: JSON.stringify(bodyData),
  })
    .then((res: Response) => res.json())
    .catch((reason) => {
      console.log("err", reason);
      return "Something went wrong!";
    });
  return data;
};

export const updateRestaurantCategory = async (
  selectedresto: RestaurantType,
  selectedCategory: string
) => {
  await fetch(`/api/getrestaurants`, {
    method: "PUT",
    body: JSON.stringify({
      selectedresto: selectedresto,
      selectedCategory: selectedCategory,
    }),
  })
    .then((res: Response) => console.log(res))
    .catch((reason) => {
      console.log("err", reason);
      return "Something went wrong!";
    });
};

export default fetchRestaurants;
