import React from 'react';
import { io } from "socket.io-client";
import { useEffect } from 'react';

const ChatroomPage = ({ match }) => {
    const chatroomId = match.params.id;
    const socket = io("http://localhost:8000")
    
    return (
        <div>
            ChatroomPage
        </div>
    )
}

export default ChatroomPage;
