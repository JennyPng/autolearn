import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseForm from "./components/CourseForm";
import Schedule from "./pages/Schedule";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<CourseForm />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
