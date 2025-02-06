import axios from "axios";

const instance = axios.create({
  baseURL: "https://hamardikanserver.my.id/", // production
  // baseURL: 'https://95ad-182-253-152-65.ngrok-free.app/', // developmentcd
});

export default instance;
