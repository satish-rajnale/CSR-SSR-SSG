import type { NextApiRequest, NextApiResponse } from "next";
import { FetchEvent } from "next/dist/server/web/spec-compliant/fetch-event";
import { seedDatabase } from "../../functions/Firebase.prod";
import RestaurantType from "../../types";
// import "../../public/data.txt";
type Data = {
  data: string[];
};
const fs = require("fs");
const restoStatus = [
  "A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food.",

  "Fame itself... doesn't really afford you anything more than a good seat in a restaurant.",
  "I was eating in a Chinese restaurant downtown. There was a dish called Mother and Child Reunion. It's chicken and eggs. And I said, I gotta use that one.",
  "Love, like a chicken salad or restaurant hash, must be taken with blind faith or it loses its flavor.",
  "People like consistency. Whether it's a store or a restaurant, they want to come in and see what you are famous for.",
];
const images = [
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/c/v/p12737-15142932095a4247d95cd52.jpg?tr=tr:n-medium",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/7/s/v/p73265-15776215315e08981bb0c73.jpg?tr=tr:n-medium",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/8/h/b/p89882-1615626307604c804320f88.jpg?tr=tr:n-medium",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/a/e/p69767-15742486145dd520a6f275c.jpg?tr=tr:n-medium",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/7/p/e/p737-148757585558aa9b2f99519.jpg?tr=tr:n-medium",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/4/j/b/p48258-15875515975ea01d6d7bcd9.jpg?tr=tr:n-medium",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/q/e/p525-15483299905c49a406841dc.jpg?tr=tr:n-medium",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/c/h/p59-162642318760f13f93d8c77.jpg?tr=tr:n-medium",
];
const addresses = [
  {
    city: "Port Lauren",
    country: "Nauru",
    state: "Pennsylvania",
  },
  {
    city: "Port Noahmouth",
    country: "Peru",
    state: "Arizona",
  },
  {
    city: "New Quintontown",
    country: "South Africa",
    state: "Hawaii",
  },
  {
    city: "Port Adell",
    country: "Chad",
    state: "Colorado",
  },
  {
    city: "Robertsshire",
    country: "Italy",
    state: "Massachusetts",
  },
  {
    city: "South Gerhard",
    country: "Bulgaria",
    state: "New Mexico",
  },
  {
    city: "Fatimachester",
    country: "Costa Rica",
    state: "Alaska",
  },
  {
    city: "Rutherfordbury",
    country: "Croatia",
    state: "Utah",
  },
];
function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const piece = (Math.random() * 16) | 0;
    const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
    return elem.toString(16);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  let arr: any[] = [];
  const resp = await fetch(
    `https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7`
  );
  const data = await resp.json();
  // fs.readFile("./public/data.txt", (error: Error, data: any) => {
  //   if (error) {
  //     throw error;
  //   }
  console.log(data);
  if (data == undefined || null) {
    return;
  }
  arr = data.map((e: object) => {
    let obj: RestaurantType = {
      id: "",
      name: "",
      category: "",
      price: 0,
      image_url: "",
      statusDesc: "",
    };
    obj.id = e.id;
    obj.name = e.item_name;
    obj.price = e.price;
    let no = Math.round(Math.random() * 8);
    if (no >= 8) {
      no = 5;
    }
    obj.image_url = images[no];
    no = Math.round(Math.random() * 5);
    if (no >= 5) {
      no = 4;
    }
    obj.statusDesc = restoStatus[no];

    let categories = ["veg", "nonveg"];
    obj.category = categories[Math.floor(Math.random() * 2)];
    return obj;
  });
  console.log(arr);
  // seedDatabase(arr);
  res.status(200).send("Data uploaded");
  // });
}
