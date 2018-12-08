import axios from "axios";

export default axios.create({
  baseURL: "https://sport-stat-server.herokuapp.com/",
  withCredentials: true
});
