import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { SignIn, SignOut, useAuthentication } from "../service/authService";

function DogNav() {
  const user = useAuthentication();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Doggie Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              {user ? <Nav.Link href="/blogs">Blogs</Nav.Link> : null}
              {user ? <Nav.Link href="/myBlogs">My Blogs</Nav.Link> : null}
              {user ? <Nav.Link href="/addBlog">Add a Blog</Nav.Link> : null}
            </Nav>
            <Nav className="justify-content-end" style={{ width: "50%" }}>
              <div className="d-flex">
                <header>{!user ? <SignIn /> : <SignOut />}</header>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default DogNav;
