import React from "react";
import { useState, useEffect } from "react";
import { fetchCourses } from "../services/api";
import CoursesPage from "./CoursesPage";
import ReactPaginate from "react-paginate";
import { LinearProgress, Box } from "@mui/material/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [itemOffset, setItemOffset] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 9;

  useEffect(() => {
    async function getCourses() {
      try {
        setIsLoading(true);
        const data = await fetchCourses();
        setCourses(data.courses);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCourses();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(courses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(courses.length / itemsPerPage));
  }, [courses, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % courses.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {error && toast.error("Something went wrong!")}
      <ToastContainer />
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <CoursesPage courses={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}
