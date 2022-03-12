import * as Firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  orderBy,
  startAfter,
  where,
  limit,
  updateDoc,
  getDocs,
  FieldValue,
} from "@firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = Firebase.initializeApp(firebaseConfig);

const firestore = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export async function seedDatabase(data) {
  // if (!admin.apps.length) {
  //     try {
  //       admin.initializeApp({
  //         credential: admin.credential.cert(serviceAccount),
  //         databaseURL: ""
  //       });
  //     } catch (error) {
  //       console.log('Firebase admin initialization error', error.stack);
  //     }
  //   }

  // const todoData = {
  //   id: getUUID(),
  //   name: "Tiger King",
  //   opening_times: ["An ", "asd"],
  //   image_url: "documentaries",
  //   rating: "4",
  //   category: "tiger-king",
  //   address: "dfsdsdf",
  //   statusDesc: "",
  // };
  data.forEach(async (obj) => {
    const singleDoc = doc(firestore, `restaurants/${obj.id}`);
    await setDoc(singleDoc, obj);
  });
}

export const getDocsData = async (isNext, lastDoc) => {
  let result = [];
  let dataquery = query(
    collection(firestore, "restaurants"),
    orderBy("name", "asc"),
    limit(9)
  );
  if (isNext) {
    dataquery = query(
      collection(firestore, "restaurants"),
      orderBy("name", "asc"),
      startAfter(lastDoc.name),
      limit(9)
    );
  }
  let querySnapshot = await getDocs(dataquery);
  let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });
  let categories = [];
  if (!isNext) {
    dataquery = query(collection(firestore, "categories"));
    querySnapshot = await getDocs(dataquery);
    querySnapshot.forEach((doc) => {
      categories.push({ name: doc.id, ids: doc.data().idList });
    });
  }
  return [lastVisible.data(), result, categories];
};

export const updateToDB = async (data, selectedCategory) => {
  const resto = doc(firestore, `restaurants/${data.id}`);
  await updateDoc(resto, {
    category: selectedCategory,
  });
  // const category = doc(firestore, `categories/${selectedCategory}`);
  // const ids = categories.find((obj) => obj.name == selectedCategory).ids;
  // const unionRes = await category.update({
  //   idList: FieldValue.arrayUnion(selectedCategory),
  // });
};

export const addCategoryToDB = async (name) => {
  const docRef = doc(firestore, "categories", name);
  const docExists = await getDoc(docRef);
  if (!docExists.exists()) {
    const idList = [];
    const singleDoc = doc(firestore, `categories/${name}`);
    await setDoc(singleDoc, { idList });
    return true;
  } else {
    return false;
  }
};
