import React, { useState } from "react";
import "../App.css";
import DogNav from "./dog-navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Timestamp } from "firebase/firestore";
import { auth, storage } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { AddBlogDb } from "../service/blogService";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebase/firebase";

function AddBlog() {
  const [validated, setValidated] = useState(false);
  const [user] = useAuthState(auth);

  const [imageAsFile, setImageAsFile] = useState("");
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = (e) => {
    // e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      return;
    }
    const storageRef = ref(storage, `/images/${imageAsFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleSubmit = (event) => {
    handleFireBaseUpload(event);

    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (!user) {
      alert("Sign in to add a Blog!");
      event.preventDefault();
      event.stopPropagation();
    }
    let author = [auth.currentUser.displayName];
    if (form.elements.coAuthor && form.elements.coAuthor.value !== "") {
      author.push(form.elements.coAuthor.value);
    }
    AddBlogDb(
      author,
      form.elements.title.value,
      Timestamp.fromDate(new Date()),
      form.elements.body.value,
      `/images/${imageAsFile.name}`
    );
    setValidated(true);
  };
  return (
    <>
      <DogNav />
      <div className="background">
        <div className="title">
          <h1 className="text-center">Add a New Blog</h1>
        </div>
        <div className="smallerForm">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-5 text-md" controlId="title">
              <Form.Label className="h4">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Where's my bone"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 text-md" controlId="coAuthor">
              <Form.Label className="h4">Co-Author (Excluding Self)</Form.Label>
              <Form.Control type="text" placeholder="James Bone" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="body">
              <Form.Label className="h4">Descriptiion</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="I went to the park"
                rows={3}
                required
              />
              <input
                className="mt-3"
                type="file"
                onChange={handleImageAsFile}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
