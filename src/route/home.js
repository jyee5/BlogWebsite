import React from "react"
import "../App.css"
import DogNav from "./dog-navbar"
import { SignIn, useAuthentication } from "../service/authService"

function Home() {
  const user = useAuthentication()
  return (
    <>
      <DogNav />
      <div className="background">
        <div className="smallerForm text-center">
          <div className="picture">
            <img src="homeScreen.png" alt="image of a group of dogs" />
          </div>
          <div className="description">
            <h1>Home</h1>
            <h3>
              This blog is for dogs to discuss their daily lives and to let their other
              doggie friends brag about things that they have done.
            </h3>
            {!user ? (
              <h4>
                <br></br>
                To view blogs
                <div>
                  <SignIn />
                </div>
              </h4>
            ) : (
              <h4>You are signed in! Go browse the blogs!</h4>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
