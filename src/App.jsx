import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { app, storage } from './firebase';
import { listAll, getDownloadURL, ref as storageRef } from 'firebase/storage';
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import Message from "./components/Message";
import Vision from "./components/Vision";
import Mission from "./components/Mission";
import AddAthletics from "./components/AddAthletics";
import Others from "./components/Others";
import Athletics from "./components/Athletics";
import Po from "./components/Po";
import Pso from "./components/Pso";
import Peo from "./components/Peo";
import AddResult from "./components/AddResult";
import Result from "./components/Result";
import AddConverse from "./components/AddConverse";
import Converse from "./components/Converse";
import AddSyllabus from "./components/AddSyllabus";
import AddAnalysis from "./components/AddAnalysis";
import ShowAnalysis from "./components/ShowAnalysis";
import ImageUploader from "./components/ImageUploader";
import AddCalender from "./components/AddCalender";
import ShowCalender from "./components/ShowCalender";
import Scholar from "./components/Scholar";
import Iep from "./components/Iep";
import Ind from "./components/Ind";
import ShowInds from "./components/ShowInds";
import Alumini from "./components/Alumini";
import ShowAlumini from "./components/ShowAlumini";
import StudInfo from "./components/StudInfo";
import ShowStudInfo from "./components/ShowStudInfo";
import AddClassTimetable from "./components/AddClassTimeTable";
import ShowClassTimetable from "./components/ShowClassTimeTable";
import UsersPage from "./components/UsersPage";
import "./App.css";
import axios from 'axios';
import Syllabus from "./components/Syllabus";
import ShowCalendar from "./components/ShowCalender";

const fetchImageUrls = async () => {
  const storageReference = storageRef(storage, 'images/');
  const result = await listAll(storageReference);
  const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  return Promise.all(urlPromises);
};

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await fetchImageUrls();
        setImages(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
        >
          <img src={image} className="home-img" alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Slider />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/Vision" element={<Vision />} />
          <Route path="/Mission" element={<Mission />} />
          <Route path="/Peo" element={<Peo />} />
          <Route path="/Po" element={<Po />} />
          <Route path="/Pso" element={<Pso />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/addcalender" element={<AddCalender />} />
          <Route path="/showcalender" element={<ShowCalendar />} />
          <Route path="/addtable" element={<AddClassTimetable />} />
          <Route path="/showtable" element={<ShowClassTimetable />} />
          <Route path="/scholar" element={<Scholar />} />
          <Route path="/alumini" element={<Alumini />} />
          <Route path="/iep" element={<Iep />} />
          <Route path="/others" element={<Others />} />
          <Route path="/showalumini" element={<ShowAlumini />} />
          <Route path="/addind" element={<Ind />} />
          <Route path="/showind" element={<ShowInds />} />
          <Route path="/addsyllabus" element={<AddSyllabus />} />
          <Route path="/addresults" element={<AddResult />} />
          <Route path="/results" element={<Result />} />
          <Route path="/studinfo" element={<StudInfo />} />
          <Route path="/addathletics" element={<AddAthletics />} />
          <Route path="/showathletics" element={<Athletics />} />
          <Route path="/showstud" element={<ShowStudInfo />} />
          <Route path="/addanalysis" element={<AddAnalysis />} />
          <Route path="/showanalysis" element={<ShowAnalysis />} />
          <Route path="/addconverse" element={<AddConverse />} />
          <Route path="/converse" element={<Converse />} />
          <Route path="/imageupload" element={<ImageUploader />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/userspage" element={<UsersPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;