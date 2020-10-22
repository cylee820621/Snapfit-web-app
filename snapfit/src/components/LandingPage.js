import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import DispatchContext from "../DispatchContext";
import { Container, Navbar, Button } from "react-bootstrap";
import Axios from "axios";
import "../styles/landingpage.css";

function LandingPage() {
  const appDispatch = useContext(DispatchContext);

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    if (response.profileObj) {
      getUserData(response.profileObj);
    }
  };

  async function getUserData(userData) {
    try {
      const response = await Axios.get(`/api/friendlist/${userData.googleId}`);
      if (response) {
        console.log("API:getuserdata");
        console.log(response.data);
        APIlogin(response.data.user_id);
        appDispatch({ type: "login", data: response.data });
        return response.data;
      }
    } catch (e) {
      console.log("The userid is not in the database, creating one now");
      const response = postUserData(userData);
      return response.data;
    }
  }
  async function postUserData(userData) {
    try {
      const data = {
        user_id: userData.googleId,
        user_name: userData.name,
        ImageUrl: userData.imageUrl
      };
      const response = await Axios.post("/api/friends", data);
      if (response) {
        console.log(response);
        console.log("Successfully created an new user!");
        getUserData(userData);
        return response;
      }
    } catch (e) {
      console.log("There is a problem posting userdata");
    }
  }

  async function APIlogin(userId) {
    const response = await Axios.put(`/api/login/${userId}`);
    if (response) {
      console.log(response);
    }
  }

  return (
    <Container fluid className="landing">
      <Navbar expand="xl" className="navbar">
        <h1>SNAPFIT</h1>
        <div className="google-btn">
          <GoogleLogin clientId="250791291053-bk8gbafnq1n9jf03p7hrk753rolh2kjs.apps.googleusercontent.com" buttonText="Login" onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy={"single_host_origin"} />
        </div>
      </Navbar>
      <Container fluid>
        <div className="body">
          <div className="body-content"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit alias iste impedit eligendi sunt quas voluptate, possimus explicabo numquam aliquam beatae dicta labore, id amet qui natus earum similique blanditiis. </div>
        </div>
        <div className="learn-more-btn">
          <Button variant="info">Learn More</Button>
        </div>
      </Container>
    </Container>
  );
}

export default LandingPage;
