import React, { useState } from "react"
import "../App.css"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { FaTrash } from "react-icons/fa"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { DeleteBlogDb } from "../service/blogService"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../firebaseConfig"

function Blog(prop) {
  const title = prop.title
  const body = prop.body
  const date = prop.date.toDate().toDateString()
  const author = prop.author
  const imgLocation = prop.image
  const [imageHttp, setImageHttp] = useState("")
  function deleteBlog() {
    DeleteBlogDb(prop.id)
  }
  const imageRef = ref(storage, imgLocation)
  getDownloadURL(imageRef)
    .then(url => {
      const xhr = new XMLHttpRequest()
      xhr.responseType = "blob"
      xhr.onload = event => {
        const blob = xhr.response
      }
      xhr.open("GET", url)
      xhr.send()
      setImageHttp(url)
    })
    .catch(error => {
      console.log(error)
    })
  return (
    <>
      <div className="smallerForm">
        <Container>
          <Row className="justify-content-md-center ">
            <h1>{title}</h1>
          </Row>
          <Row className="justify-content-md-center">
            <p>
              By: {author}
              <br></br>
              {date}
            </p>
          </Row>
          <Row className="justify-content-md-center">
            <p>{body}</p>
          </Row>

          {imageHttp ? (
            <Row className="justify-content-md-center">
              <img src={imageHttp} alt="image" />
            </Row>
          ) : null}

          <Row>
            <Col md={{ span: 3, offset: 0 }}>
              {prop.mine ? (
                <Button className="ml2" onClick={deleteBlog}>
                  <FaTrash />
                </Button>
              ) : null}
            </Col>
          </Row>
        </Container>
        <hr className="mt-5"></hr>
      </div>
    </>
  )
}

export default Blog
