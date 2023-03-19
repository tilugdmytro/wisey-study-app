import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

var slugify = require("slugify");

let theme = createTheme({});
theme = responsiveFontSizes(theme);

const dateChange = (string) => {
  const parsedStr = parseISO(string);
  const dateFinal = format(parsedStr, "MMMM do, yyyy");
  return dateFinal;
};

function CoursesPage({ courses }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={4}>
          {courses.length > 0 &&
            courses.map(
              ({
                id,
                description,
                title,
                previewImageLink,
                lessonsCount,
                rating,
                meta: { skills },
                launchDate,
              }) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      alignContent: "flex-start",
                      transition: "transform 0.25s",
                      "&:hover": {
                        transform: "scale(1.04)",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200px"
                      image={`${previewImageLink}/cover.webp`}
                      alt={title}
                    />
                    <CardContent>
                      <Typography
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          opacity: 0.6,
                        }}
                      >
                        <DateRangeIcon
                          sx={{ color: "disabled", mr: 1, fontSize: "large" }}
                        />
                        {dateChange(launchDate)}
                      </Typography>

                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          mb: 2,
                        }}
                      >
                        {title}
                      </Typography>

                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          mb: 2,
                        }}
                      >
                        Course description: {description}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{
                          mb: 2,
                        }}
                      >
                        Lessons: {lessonsCount}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{
                          mb: 2,
                        }}
                      >
                        Rating: {rating}
                      </Typography>

                      <Typography variant="h6" component="p">
                        Skills:
                      </Typography>
                      {skills && (
                        <List>
                          {skills.map((el) => (
                            <ListItem
                              key={el}
                              sx={{
                                p: 0,
                                pl: 2,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 30,
                                }}
                              >
                                <ArrowRightIcon />
                              </ListItemIcon>
                              <ListItemText primary={el} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </CardContent>

                    <CardActions>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={`/course/${slugify(`${title} ${id}`, {
                          lower: true,
                          remove: /[*+~.,:()'"!@]/g,
                        })}`}
                      >
                        <Button
                          color="inherit"
                          endIcon={<ArrowForwardIcon />}
                          size="large"
                          sx={{ textTransform: "none", fontWeight: 700 }}
                        >
                          Go to course
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              )
            )}
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default CoursesPage;
