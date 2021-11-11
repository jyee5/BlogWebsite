import React, { useState, useEffect } from "react"
import "../App.css"
import DogNav from "./dog-navbar"
import Blog from "./blog"

import { FetchBlogs } from "../service/blogService"

function Blogs() {
  const [allBlogs, setBlogs] = useState([])
  useEffect(() => {
    FetchBlogs().then(data => {
      setBlogs(data)
    })
  }, [])
  allBlogs.map(blog => {
    console.log(blog)
  })
  console.log(allBlogs)
  return (
    <>
      <DogNav />
      <div className="background">
        <div className="title">
          <h1 className="text-center">Blogs</h1>
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
          />
        ))}
      </div>
    </>
  )
}

export default Blogs
