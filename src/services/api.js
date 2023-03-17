import axios from "axios";

axios.defaults.baseURL = "https://api.wisey.app/api/v1";

const setToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

async function fetchToken() {
  try {
    const { data } = await axios.get("/auth/anonymous?platform=subscriptions");
    setToken(data.token);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCourses() {
  try {
    await fetchToken();
    const { data } = await axios.get("/core/preview-courses");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCourseById(courseId) {
  try {
    await fetchToken();
    const { data } = await axios.get(`/core/preview-courses/${courseId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
