import React from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ChatroomPage = ({ match, socket }) => {
  const chatroomId = match.params.id;
  // const socket = io("http://localhost:8000")

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">Chatroom Name</div>
        <div className="chatroomContent">
          <div className="message">
            <span className="otherMessage">Eme say: </span>Hello Guys
          </div>
          <div className="message">
            <span className="ownMessage">Alex say: </span>Hello Eme
          </div>
        </div>
        <div className="chatroomActions">
          <div>
            <input type="text" name="message" placeholder="Say sommething" />
                  </div>
                  <div>
                      <button className="join">Send</button>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPage);
