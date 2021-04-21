import "./App.css";
import styled from "styled-components/macro";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const addEmployee = () => {
    console.log(name, age, country, position, wage);
    axios
      .post("http://localhost:3001/create", {
        // Passing values to the back-end.
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then(() => {
        console.log("success");
      }); // This is the endpoint that we want to make request.
  };

  return (
    <Container>
      <label>Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <label>Age:</label>
      <input type="number" onChange={(e) => setAge(e.target.value)} />
      <label>Country:</label>
      <input type="text" onChange={(e) => setCountry(e.target.value)} />
      <label>Position:</label>
      <input type="text" onChange={(e) => setPosition(e.target.value)} />
      <label>Wage (year)</label>
      <input type="number" onChange={(e) => setWage(e.target.value)} />
      <button onClick={addEmployee}>Add Employee</button>
    </Container>
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
    }
  }
`;

export default App;
