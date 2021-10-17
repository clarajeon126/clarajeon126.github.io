// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
import {
    getFirestore,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfClGFZSzZ1SkDrNulN16Cimula7l1SVE",
  authDomain: "bfbf-4fc9a.firebaseapp.com",
  projectId: "bfbf-4fc9a",
  storageBucket: "bfbf-4fc9a.appspot.com",
  messagingSenderId: "987550818209",
  appId: "1:987550818209:web:07e12f22de27d469c135e0",
  measurementId: "G-P52QZZ7YPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function saveForm(info){
    try {
        //save to firebase
        const docRef = await setDoc(doc(db, "hellie's candidates", info.name), {
            name: info.name,
            pottery: info.pottery,
            discord: info.discord,
            interest: info.interests,
            favfood: info.favfood,
            likeme: info.likeme
        });
        console.log(info.name + "? possible candidate????");

        //return back info
        return info
    } catch (error) {
        console.log("error: " + error);
    }
}
