import "react-credit-cards/es/styles-compiled.css";
import "firebase/messaging";

import "./config/i18next";

import firebase from "firebase/app";
import { createBrowserHistory } from "history";
import moment from "moment";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { RendererProvider } from "react-fela";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { RecoilRoot } from "recoil";

import axios from "./config/axios";
import { createFelaRenderer } from "./config/fela";
import { ServiceContext } from "./context/Service";
import Routes from "./routes/Routes";
import {
  Auth,
  Cards,
  Dashboard,
  Fmc,
  Notifications,
  Payout,
  Transaction,
} from "./services";

require("./styles.css");

moment.locale("ru");
firebase.initializeApp({
  measurementId: "G-KZGENXC9EN",
  projectId: "gettipsonline-e501f",
  messagingSenderId: "954503722891",
  storageBucket: "gettipsonline-e501f.appspot.com",
  apiKey: "AIzaSyAT32WhaZmnN4iJZuhZkfPzhlhqBiMjZK4",
  authDomain: "gettipsonline-e501f.firebaseapp.com",
  appId: "1:954503722891:web:bd75af99cda10bfaab218e",
  databaseURL: "https://gettipsonline-e501f.firebaseio.com",
});

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

const fcm = new Fmc(firebase.messaging());

const services = {
  cards: new Cards(axios),
  payout: new Payout(axios),
  auth: new Auth(axios, fcm),
  dashboard: new Dashboard(axios),
  transaction: new Transaction(axios),
  notifications: new Notifications(axios),
};

const renderer = createFelaRenderer();
const history = createBrowserHistory();

function Entry() {
  return (
    <ServiceContext.Provider value={services}>
      <RecoilRoot>
        <Suspense fallback={null}>
          <ReactQueryConfigProvider
            config={{ queries: { refetchOnWindowFocus: false } }}
          >
            <RendererProvider renderer={renderer}>
              <Routes />
            </RendererProvider>
            <ReactQueryDevtools />
          </ReactQueryConfigProvider>
        </Suspense>
      </RecoilRoot>
    </ServiceContext.Provider>
  );
}

ReactDOM.render(<Entry />, document.getElementById("app"));
