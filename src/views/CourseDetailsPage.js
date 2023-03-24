import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchCourseById } from "../services/api";
import defaultImg from "../img/locked.jpg";
import {
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "react-toastify/dist/ReactToastify.css";

let theme = createTheme({});
theme = responsiveFontSizes(theme);

export default function CourseDetailsPage() {
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const courseId = slug.match(
    /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/
  )[0];
  const location = useLocation();

  useEffect(() => {
    async function getCourseById() {
      setIsLoading(true);
      const data = await fetchCourseById(courseId);
      setCourse(data);
      setIsLoading(false);
    }
    getCourseById();
  }, [courseId]);

  const { title, previewImageLink, lessons, description } = course;

  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                mb: 4,
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                mb: 2,
              }}
            >
              Course description: {description}
            </Typography>
            <CardMedia
              component="img"
              image={`${previewImageLink}/cover.webp`}
              alt={title}
            />
            {lessons?.map(
              ({ link, order, previewImageLink, title, status, id }, index) => (
                <Box key={id}>
                  <Accordion sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography
                        sx={{ minWidth: "20%", flexShrink: 0, mr: 2 }}
                      >
                        Lesson {index + 1}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {status === "unlocked" ? (
                        <video
                          src={`${link}`}
                          poster={`${previewImageLink}/lesson-${order}.webp`}
                          type="application/x-mpegURL"
                          width="300"
                          controls
                          loop
                          preload="auto"
                        ></video>
                      ) : (
                        <>
                          <p>Sorry, this lesson is locked</p>
                          <img src={defaultImg} alt={title} width="150" />
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              )
            )}
            <Link
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to={location.state?.from ?? "/wisey-study-app"}
            >
              <Button
                color="inherit"
                startIcon={<ArrowBackIcon />}
                size="large"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Back to courses
              </Button>
            </Link>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
}
