import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import Login from './Login';
import Navbar from './Navbar'
import Home from './Home';
import Tabel from './Tabel';

function App() {

  const [user,  setUser] = useState(null)
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
      <div className="wraper">
        <Navbar user={user}/> 
        <Routes>
          <Route path="/login" element={ user === null ? <Login /> : <Home />} />
          <Route path="/table" element={ <Tabel user={user} /> } />
          <Route path="/" element={<Home user={user} />} />
        </Routes>
      </div>
  );
}

export default App;
