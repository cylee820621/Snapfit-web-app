import React, { useState, useContext } from "react";
import { Card, Button, Image } from "react-bootstrap";
import FriendCardSchedule from "./FriednCardSchedule";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import Modal from "react-modal";
import "../styles/friendcard.css";
import Axios from "axios";

function FriendCard(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const index = props.index;
  const name = props.data.user_name;
  const image = props.data.ImageUrl;
  const userid = props.data.user_id;
  const schedule = {
    Monday: props.data.Monday,
    Tuesday: props.data.Tuesday,
    Wednesday: props.data.Wednesday,
    Tursday: props.data.Thursday,
    Friday: props.data.Friday,
    Saturday: props.data.Saturday,
    Sunday: props.data.Sunday
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  function handleSchedule() {
    setOpenSchedule(!openSchedule);
  }

  function handleSendMassage() {
    alert("Send");
    closeModal();
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  async function handleremovefriend() {
    console.log(index);
    const response = Axios.put(`/api/removefriend/${userid},${appState.user.userID}`);
    if (response) {
      console.log(response);
      await appDispatch({ type: "removeFriend", value: index });
    }
    console.log(appState.friend);
  }

  return (
    <Card className="friendcard-box shadow">
      <Button onClick={handleremovefriend} className="remove-friend-btn" variant="light">
        <i className="fas fa-times"></i>
      </Button>
      <div className="d-flex justify-content-center">
        <Image className="image-size p-1" roundedCircle src={image} alt="user-image" />
      </div>
      <div className="friendcard-username d-flex justify-content-center">{name}</div>
      {openSchedule && <FriendCardSchedule schedule={schedule} />}
      <div className="friend-card-btn-box d-flex justify-content-between">
        {!openSchedule ? (
          <Button onClick={handleSchedule} variant="success" className="friendcard-btn">
            <i className="far fa-calendar-alt"></i>
          </Button>
        ) : (
          <Button onClick={handleSchedule} variant="danger" className="friendcard-btn">
            <i className="far fa-calendar-alt"></i>
          </Button>
        )}
        <Button variant="info" className="friendcard-btn" onClick={openModal}>
          <i className="far fa-envelope"></i>
        </Button>

        <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal} ariaHideApp={false}>
          <Button variant="black" size="sm" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </Button>
          <div>Send a email</div>
          <form className="d-flex justify-content-center">
            <input />
            <Button onClick={handleSendMassage} size="sm">
              Send
            </Button>
          </form>
        </Modal>
      </div>
    </Card>
  );
}

export default FriendCard;
