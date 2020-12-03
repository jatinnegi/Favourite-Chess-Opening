import React, { useState } from "react";
import { getFavouriteOpening } from "./utilities";
import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    getFavouriteOpening(username);
    setUsername("");
  };

  return (
    <div className="main">
      <h1 className="heading">Favourite Opening</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter Chess.com Username (case sensitive)"
            required
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-control btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
