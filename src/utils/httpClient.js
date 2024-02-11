import Axios from "axios";

const api = Axios.create({
  baseURL: `https://localhost:7188/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

class HttpClient {
  get(url, configs=null) {
    return api.get(url, configs);
  }

  post(url, data, configs=null) {
    return api.post(url, data, configs);
  }

  put(url, data=null, configs=null) {
    return api.put(url, data, configs);
  }

  delete(url, config=null) {
    return api.delete(url, config);
  }
}

export const httpClient = new HttpClient();