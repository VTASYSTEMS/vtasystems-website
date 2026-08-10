// ======================================================
// VTA SYSTEMS - FIREBASE CONFIG
// ======================================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { getStorage } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv_F507Y_8X3yo-Nc1yIqKeYPY6O7TESc",
  authDomain: "vta-systems.firebaseapp.com",
  databaseURL: "https://vta-systems-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vta-systems",
  storageBucket: "vta-systems.firebasestorage.app",
  messagingSenderId: "597894554622",
  appId: "1:597894554622:web:3fc5ab6c87ad5de68c16af",
  measurementId: "G-VD08EE0374"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export {
  app,
  auth,
  database,
  storage
};
