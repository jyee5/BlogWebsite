import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBwP-U6sQUJEzi1O9gVukU8gc1vZIHHuek",
  authDomain: "blog-3943c.firebaseapp.com",
  projectId: "blog-3943c",
  storageBucket: "blog-3943c.appspot.com",
  messagingSenderId: "750649291765",
  appId: "1:750649291765:web:4e877f821b0fc8f28ea6bc",
  measurementId: "G-G6YJEP9L2E",
}
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
