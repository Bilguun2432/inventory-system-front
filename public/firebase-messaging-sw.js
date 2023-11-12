importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js",
);
const firebaseConfig = {
  apiKey: "AIzaSyC1-PkhN9H1KVGLxj6N8x4YQWSO9CR0mUI",
  authDomain: "corporate-482d5.firebaseapp.com",
  projectId: "corporate-482d5",
  storageBucket: "corporate-482d5.appspot.com",
  messagingSenderId: "75242030802",
  appId: "1:75242030802:web:7ad7d25f07a73564b7cf0b",
  measurementId: "G-GVQW5703M0",
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = app.firebase.messaging();

messaging.onMessage(function (payload) {
  console.log("Message received ", payload);
});

messaging
  .getToken({
    vapidKey:
      "BFpehDQvG1NuAK9WTM8w-S_lzWmvjlQG8Udo9ec0vB2ASQbW91ITAd_9xPZGGSmZsxLLAymZcDtO0s77EI-bHRU",
  })
  .then((currentToken) => {
    console.log(currentToken);
  })
  .catch((err) => {
    console.log(err);
  });
