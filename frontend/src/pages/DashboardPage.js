import React from 'react'

export default function DashboardPage() {
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
                <div className="chatroom">
                    <div>Happy Newbie</div>
                    <div className="join">Join</div>
                </div>
            </div>
      </div>
    );
}
