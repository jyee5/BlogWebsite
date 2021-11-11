import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export async function FetchBlogs() {
  let blogs = []
  const querySnapshot = await getDocs(collection(db, "articles"))
  querySnapshot.forEach(item => {
    blogs.push(item)
  })
  return blogs
}

export async function AddBlogDb(author, title, date, body, url) {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      Author: author,
      Body: body,
      Date: date,
      Title: title,
      imageUrl: url,
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export async function DeleteBlogDb(id) {
  try {
    await deleteDoc(doc(db, "articles", id))
  } catch (e) {
    console.error("Error adding document: ", e)
  }
  window.location.reload()
}
