import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "movie-finder-fdabf.firebaseapp.com",
    projectId: "movie-finder-fdabf",
    storageBucket: "movie-finder-fdabf.appspot.com",
    messagingSenderId: "575182937757",
    appId: "1:575182937757:web:24c6e54894b392f50bfe74"
};

export const app = initializeApp(firebaseConfig);
