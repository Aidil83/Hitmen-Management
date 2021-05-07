import "./App.css";
import styled from "styled-components/macro";
import { useState } from "react";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [hitmanList, setHitmanList] = useState([])


  // Create endpoint
  const addCustomer = () => {
    // console.log(name, age, location, position, wage);
    console.log(name, location);

    Axios.post("http://localhost:3001/create", {
      // Passing values to the back-end.
      name: name,
      location: location,
    }).then(() => {
      console.log("success");
    }); // This is the endpoint that we want to make request.
  };

  // Delete endpoint
  const deleteHitman = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
  }


  const getHitman = () => {
    Axios.get("http://localhost:3001/hitman").then((res) => {
      console.log(res);
    })
  }
  const showHitman = () => {
    Axios.get("http://localhost:3001/hitman").then((res) => {
        setHitmanList(res.data);
    })
  }

  return (
    <Router>
      <Switch>
          <Route path="/" exact>
            <Container>
              <label>Name:</label>
              <input type="text" onChange={(e) => setName(e.target.value)} />
              <label>location:</label>
              <input type="text" onChange={(e) => setLocation(e.target.value)} />
              <button onClick={addCustomer}>Add customer</button>
              <Link to="/page2">
                <button>Next</button>
              </Link>
            </Container>
          </Route>
          <Route path="/page2" exact>
            <Container>
              <button onClick={getHitman}>Get Hitmen</button>
              <button onClick={showHitman}>Show Hitmen</button>
              <Link to="/">
                <button>Go Back</button>
              </Link>
              {hitmanList.map((val) => {
                return <div className="hitman-container" key={val.h_id}>
                  <div><b>name:</b> {val.name}</div>
                  <div><b>location:</b> {val.location}</div>
                  <div><b>ranking:</b> {val.ranking}</div>
                  <div><b>cost:</b> {val.cost}</div>
                  <div><b>specialties:</b> {val.specialties}</div>
                  <button onClick={() => {deleteHitman(val.h_id)}}>Delete</button>
                </div>
              })}
            </Container>
          </Route>
      </Switch>
    </Router>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    margin-bottom: 0.5em;
  }

  input {
    height: 50px;
    width: 300px;
    font-size: 1.2rem;
  }
  button {
    margin-top: 2em;
    background-color: #ff0;
    padding: 1em;
    font-weight: bold;
    &:hover {
      background-color: orange;
      cursor: pointer;
    }
  }
  & .hitman-container {
    width: 800px;
    height: min-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin-top: 1em;
    border: 1px solid black;
    background-color: lightgray;
    button {
      align-self: center;
      margin-top: 0;

    }
  }
`;

export default App;
