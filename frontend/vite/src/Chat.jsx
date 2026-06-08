  import { useEffect, useState } from "react";
  import { io } from "socket.io-client";
  import './Chat.css'
  import { useLocation } from "react-router-dom";

  const socket = io("https://chat-app-n455.onrender.com");

  const Chat =() => {
    const location = useLocation();
    const { username, room } = location.state || {};

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      if (!username || !room) return;

      socket.emit("joinRoom", { username, room });

      socket.on("message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socket.on("roomUsers", ({ users }) => {
        setUsers(users);
      });

      return () => {
        socket.off("message");
        socket.off("roomUsers");
      };
    }, [username, room]);

    function sendMessage(e) {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (!trimmedMessage) return;

      socket.emit("chatMessage", trimmedMessage);
      setMessage("");
    }

  

  return (
    <div className="chat-page">
      <div className="chat-container">
        <aside className="sidebar">
          <h2 className="heading">{room}</h2>

          <div className="online-users">
            <h3 >Online Users</h3>

            {users.map((user) => (
              <div key={user.id} className="user ">
                <span className="status-dot"></span>
                {user.username}
              </div>
            ))}
          </div>
        </aside>

        <div className="chat-section">
            <h1  className="chat-header heading">Developer Chat</h1>

          <main className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message-card">
                <div className="message-info">
                  <strong>{msg.username}</strong>
                  <small>{msg.time}</small>
                </div>

                <p>{msg.text}</p>
              </div>
            ))}
          </main>

          <div className="message-form">
            <input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e);
                }
              }}
              required
            />

            <button type="button" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
  }

  export default Chat;
