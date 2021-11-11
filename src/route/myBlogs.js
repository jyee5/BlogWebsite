import React, { useState, useEffect } from "react"
import "../App.css"
import DogNav from "./dog-navbar"
import Blog from "./blog"
import { query, collection, getDocs, where } from "firebase/firestore"
import { auth, db } from "../firebaseConfig"

function MyBlogs() {
  const [allBlogs, setBlogs] = useState([])
  const fetchBlogs = async () => {
    const q = query(
      collection(db, "articles"),
      where("Author", "array-contains", auth.currentUser.displayName)
    )
    const querySnapshot = await getDocs(q)
    let currentBlogs = []
    querySnapshot.forEach(item => {
      currentBlogs.push(item)
    })
    setBlogs([...allBlogs, ...currentBlogs])
  }
  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <>
      <DogNav />

      <div className="background">
        <div className="title">
          <h1 className="text-center">My Blogs</h1>
        </div>
        {allBlogs.map(blog => (
          <Blog
            key={blog.id}
            id={blog.id}
            title={blog.data().Title}
            author={blog.data().Author}
            body={blog.data().Body}
            date={blog.data().Date}
            image={blog.data().imageUrl}
            mine={true}
          />
        ))}
      </div>
    </>
  )
}

export default MyBlogs
