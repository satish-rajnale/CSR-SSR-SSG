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
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvxAJcSQRs2u2vkyS5GoKLm66Op0CqWt0rjg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0h7U3TsDSWF7CI3z31DZHGZA1viZ8Sexd8Q&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA5n046Ev-xGmh9X5BmwJ5Bm5GTcRWfIJIqg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR23FPOXyos7d0Gwl8t7h6vXECsZKhTeJwtng&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOlLfoQ_CBqbhal0YQbj4KPbwRQ8gotCPtw&usqp=CAU",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/4/j/b/p48258-15875515975ea01d6d7bcd9.jpg?tr=tr:n-medium",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0pBKhy3S3Ad_JS7sUDuUWrPOqMpJk-nFSA&usqp=CAU",
  "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/c/h/p59-162642318760f13f93d8c77.jpg?tr=tr:n-medium",
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
    obj.id = getUUID();
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
  // console.log(arr);
  // seedDatabase(arr);
  res.status(200).send("Data uploaded");
  // });
}
