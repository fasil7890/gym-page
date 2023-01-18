import React from 'react';
import {Route,Routes} from "react-router-dom";
import {Box} from "@mui/material";
import NavBar from './components/navbar';
import Home from './pages/home';
import ExerciseDetail from './pages/exercisedetail';
import Footer from './components/footer';
import "./app.css";

const App = () => {
  return <div>
    <Box width="400px" sx={{width:{xl:"1488px"}}} m="auto">
      <NavBar/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/exercise/:id" element={<ExerciseDetail/>}/>
      </Routes>
      <Footer/>
    </Box>
    </div>
  
}

export default App;