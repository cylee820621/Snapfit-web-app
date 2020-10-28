import React from "react";
import "../styles/flashmessage.css";

function FlashMessage(props) {
  return (
    <div className="floating-alerts">
      {props.msg.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            {msg}
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessage;