import axios from "axios";
import CommonUtil from "../Components/CommonUtil";

const axiosHelper = (headers) => {
  let req = axios.create({
    baseURL: 'http://localhost:8089',//this is vary much important
    headers: headers,
  });

  req.interceptors.request.use(function (request) {
    localStorage.setItem("isLoading", true);
    window.dispatchEvent(new Event("storage"));
    return request;
  });

  req.interceptors.response.use(
    function (response) {
      if (response.status === 200 && response.data?.code === "ERROR") {
        window.location = "/";
      }
      localStorage.setItem("isLoading", false);
      window.dispatchEvent(new Event("storage"));
      return response;
    },
    function (error) {
      if (401 === error.response?.status && error.response.data?.code === "ERROR") 
        window.location = "/"
    }
  );

  return req;
};

const securedAxios = () => {
  let clientId = localStorage.getItem("RETAIL_CLIENT");
  return axiosHelper({
    "Content-type": "application/json",
    Authorization: localStorage.getItem("USER_TOKEN"),
    "accept-language": localStorage.getItem("RC_LANG_KEY"),
    "selectedClient": clientId
  });
};

const unsecuredAxios = () => {
  return axiosHelper({
    "Content-type": "application/json",
    "accept-language": localStorage.getItem("RC_LANG_KEY"),
  });
};

const api = {
  axiosHelper,
  securedAxios,
  unsecuredAxios,
};

export default api;
