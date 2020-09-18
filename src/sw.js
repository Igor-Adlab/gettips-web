// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "954503722891",
});

const messaging = firebase.messaging();

self.addEventListener("push", (event) => {
  event.waitUntil(onPush(event));
});

function onPush(event) {
  const push = event.data.json();
  const { notification = {}, data = {} } = { ...push };

  self.registration.showNotification(notification.title, notification);
}
