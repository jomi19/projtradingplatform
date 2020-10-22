import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from "./modules/header/header.js";
import StartPage from "./modules/main/startpage/startpage.js";
import Footer from "./modules/footer/footer.js";
import Chat from "./modules/chat/chat.js";
import { Chart } from "react-charts";
import "./style/main.scss";
import socket from "./service/socket.js";
import LogInPage from "./modules/main/user/login.js";
import UserPage from "./modules/main/user/user.js";

function App() {


  const [chatState, setChat] = useState(false)
  const [user, setUser] = useState(false)
  console.log(user)
  return (
    <div className="App">
      <Router>
      <Header />
      
        <Route exact path="/" render={() =><StartPage /> }/>
        <Route path="/user" render={() => <UserPage user={user} setUser={setUser} />} />

        <Route exact path="/login" render={() => <LogInPage user={user} setUser={setUser} />} />
      <Chat 
        chatState={chatState}
        setChat={setChat}
      />
      <Footer />
      </Router>
      </div>
  );
}

export default App;
