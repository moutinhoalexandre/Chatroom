import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {io} from "socket.io-client";
import makeToast from "./Toaster";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";
import ChatroomPage from "./pages/ChatroomPage";


function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    console.log(token)
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token,
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  },[]);

  return (
    <Router>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route
          path="/login"
          render={() => <LoginPage setupSocket={setupSocket} />}
          exact
        />
        <Route path="/register" component={RegisterPage} exact />
        <Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact
        />
        <Route
          path="/chatroom/:id"
          render={() => <ChatroomPage socket={socket} />}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
