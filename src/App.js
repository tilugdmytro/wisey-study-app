import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage";
import CourseDetailsPage from "./views/CourseDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/wisey-study-app" index element={<HomePage />} />
        <Route path="/course/:courseId" element={<CourseDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
