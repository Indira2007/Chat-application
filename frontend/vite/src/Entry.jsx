import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Entry.css";

const Entry = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("JavaScript");
  const navigate = useNavigate();

   function joinRoom(e) {
    e.preventDefault();
    navigate("/chat", {
      state: { username, room },
    });
  }
  
  return (
    <form className="entry-form" onSubmit={joinRoom}>
      <h1  className="heading">Join Chat</h1>
      <div className="enter">
        <input
          className="name-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <select
          className="drop-down"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>JavaScript</option>
          <option>Python</option>
          <option>PHP</option>
          <option>C#</option>
          <option>Ruby</option>
          <option>Java</option>
        </select>

        <button type="submit" className="btn-join">
          Join
        </button>
      </div>
    </form>
  );
};
export default Entry;
