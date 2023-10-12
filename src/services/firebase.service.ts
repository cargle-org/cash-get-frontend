/* eslint-disable @typescript-eslint/no-unused-vars */
// import * as firebase from "firebase"
import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/messaging";
import "firebase/compat/database";
import { store } from "../store";
import { getAgentOrders, getShopOrders } from "../store/orderSlice";
import { IOrderListItem, UserEnum, OrderStatusEnum, IOrderCollectionListItem, CollectionProgressStatusEnum } from "./types";
import { getOrderCollections } from "../store/orderCollectionSlice";
// import {
//   BASE_URL,
//   FIREBASE_API_KEY,
//   FIREBASE_APP_ID,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_DATABASE_URL,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
// } from "@env";
// import https from "../utils/https";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const listenForOrders = (userId: string, role: UserEnum) => {
  const orderRef = db.ref("order");
  const listener = orderRef.on("value", (snapshot) => {
    const allOrders: IOrderListItem[] = [];
    snapshot.forEach((childSnapshot) => {
      allOrders.push(childSnapshot.val());
    });
    // allOrders.sort((a, b) => (new Date(a.deliveryPeriod).getTime() < new Date(b.deliveryPeriod).getTime() ? -1 : 1));
    // console.log(allOrders);
    const sortedOrders = allOrders.slice().sort((a, b) => parseInt(b.id) - parseInt(a.id));
    if (role === UserEnum.AGENT) {
      const openOrders = sortedOrders.filter((order) => order.remainingAmount !== 0);
      store.dispatch(
        getAgentOrders({
          openOrders,
        })
      );
    } else {
      const activeOrders = sortedOrders.filter((order) => order.shopId === userId && order.status === OrderStatusEnum.IN_PROGRESS);
      const openOrders = sortedOrders.filter((order) => order.shopId === userId && order.status === OrderStatusEnum.CREATED);
      const closedOrders = sortedOrders.filter((order) => order.shopId === userId && order.status === OrderStatusEnum.COMPLETED);
      store.dispatch(
        getShopOrders({
          activeOrders,
          openOrders,
          closedOrders,
          sortedOrders,
        })
      );
    }
  });
  return () => {
    orderRef.off("value", listener);
  };
};

const listenForOrderCollections = (userId: string) => {
  const orderCollectionRef = db.ref("orderCollection");
  const listener = orderCollectionRef.on("value", (snapshot) => {
    const allOrderCollection: IOrderCollectionListItem[] = [];
    snapshot.forEach((childSnapshot) => {
      allOrderCollection.push(childSnapshot.val());
    });
    const sortedOrderCollection = allOrderCollection.slice().sort((a, b) => parseInt(b.id) - parseInt(a.id));
    const activeOrderCollections = sortedOrderCollection.filter(
      (orderCollection) => orderCollection.collectionProgressStatus === CollectionProgressStatusEnum.STARTED && orderCollection.agentId === userId
    );
    const closedOrderCollections = sortedOrderCollection.filter(
      (orderCollection) => orderCollection.collectionProgressStatus === CollectionProgressStatusEnum.COMPLETED && orderCollection.agentId === userId
    );
    store.dispatch(
      getOrderCollections({
        closedOrderCollections,
        activeOrderCollections,
      })
    );
  });
  return () => {
    orderCollectionRef.off("value", listener);
  };
};

// const updateShopToken = async (payload: { shopId: string; notificationToken: string }): Promise<IResponse<IUser>> =>
//   https.post({
//     url: `${BASE_URL}/shop/update-notification-token/${payload.shopId}`,
//     body: JSON.stringify(payload),
//   });

// const updateAgentToken = async (payload: { agentId: string; notificationToken: string }): Promise<IResponse<IUser>> =>
//   https.post({
//     url: `${BASE_URL}/user/update-notification-token/${payload.agentId}`,
//     body: JSON.stringify(payload),
//   });

export const firebaseService = {
  listenForOrders,
  listenForOrderCollections,
  //   updateAgentToken,
  //   updateShopToken,
};
