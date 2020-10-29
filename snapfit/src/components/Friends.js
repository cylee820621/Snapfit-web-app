import React, { useContext, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import StateContext from "../StateContext";
import FriendCard from "./FriendCard";
import AddFriend from "./AddFriend";
import "../styles/friends.css";
import Axios from "axios";

function Friends() {
  const appState = useContext(StateContext);
  const [addFriend, setAddFriend] = useState(false);
  const [loading, setLoading] = useState(false);
  const friends = appState.friendData;
  console.log(friends);

  return (
    <Container className="mb-3 mt-3" id="f-box" fluid>
      <AddFriend addFriend={addFriend} setAddFriend={setAddFriend} />
      <div className="p-4">
        <Row xs={1} sm={1} md={3} lg={3} xl={4} className="justify-content-around">
          {friends.map((frienddata, index) => {
            return (
              <Col key={index}>
                <div className="d-flex justify-content-center shadow-lg m-3 mb-5 ">
                  <FriendCard data={frienddata} />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
}

export default Friends;
