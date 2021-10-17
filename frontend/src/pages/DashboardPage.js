import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DashboardPage(props) {
  const [chatrooms, setChatrooms] = useState([]);

  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((error) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  useEffect(() => {
    getChatrooms();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="texte"
            name="chatroomName"
            id="chatroomName"
            placeholder="Javascript"
          />
        </div>
      </div>
      <button>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link
              to={{
                pathname: "/chatroom/" + chatroom._id,
                state: { chatroom },
              }}
            >
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
