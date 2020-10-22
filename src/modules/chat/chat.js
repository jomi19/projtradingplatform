import React, { useRef, useState, useEffect } from 'react';
import {ReactComponent as ChatIcon} from "./chaticon.svg";

import socket from "./../../service/socket.js";
import "./style.scss";



const Chat = function(props) {
    const [chatState, setChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([{message: "test"}]);

    const textBox = useRef();
    
    useEffect(() => {
            socket.on("message", function(data) {
                console.log("nytt medelande")
                let messageList = chatMessages;
                
                setChatMessages([])
                console.log(data)
                messageList.push(data);
                setChatMessages(messageList);
                console.log(data.message);
                }
            )
    
    },[])

    const clickHandler = function(event) {
        setChat(!chatState);
        console.log(chatState)
    }

    const keyPressHandler = function(event) {
        let message = textBox.current.value;

        if(event.key == "Enter" && message.length > 0) {
            socket.emit("message", {
                message: message
            })
            textBox.current.value = "";
        }     

    }

    if (chatState) {
        return (
            <div className="wrapChat">
                <div className="chatBox">
                    <div className="chatHeader">
                        USERNAME
                    </div>
                    
                    <div className="chatContent">
                        {chatMessages.map((data, index) => 
                            <p key={index}>{data.message}</p>
                        )}
                    </div>
                    <div className="send">Send</div>
                    <input type="text" placeholder="Medelande"
                        onKeyUp={(event) => keyPressHandler(event)}
                        ref={textBox}
                    />
                </div>
                <div className="chatButton selected" 
                    onClick={(event) => clickHandler(event)}>
                    <ChatIcon />
            
                </div>
            </div>
        )
    }

    return (
        <div className="chatButton" 
            onClick={(event) => clickHandler(event)}
            
            >
                <ChatIcon />
        
        </div>
    )
}

export default Chat;