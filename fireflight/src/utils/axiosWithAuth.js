import axios from "axios";

const baseDeployedURL = "https://fireflight-lambda.herokuapp.com";
const baseLocalURL = "http://localhost:5000";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    baseURL: baseLocalURL //replace with heroku address,
  });
};

export default axiosWithAuth;
