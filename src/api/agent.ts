import axios, { AxiosResponse } from 'axios';
import { logInfo } from '../utils/general';

// Get the API URL for the current environment.
const API_URL = process.env.REACT_APP_API_URL;

//Get the BandInTown api key
const BAND_IN_TOWN_API_KEY = process.env.REACT_APP_BAND_IN_TOWN_API_KEY;

// Print the API URL to the console if logging is enabled.
logInfo('Environment process API URL', API_URL);

// Print the API URL to the console if logging is enabled.
logInfo('Environment process API KEY', BAND_IN_TOWN_API_KEY);

// Set the base URL for Axios requests.
axios.defaults.baseURL = API_URL;

// Include credentials (such as cookies) in all Axios requests by default.
// axios.defaults.withCredentials = true; // not need at this moment

// This function reads the data from an Axios response and returns the response body.
const responseBody = (response: AxiosResponse) => response.data;

// This object contains functions for making HTTP requests using Axios.
// The functions correspond to HTTP verbs (e.g. GET, POST, PUT, DELETE) and accept a URL and optional parameters.
// The functions return a Promise that resolves to the response body.
const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  // This function is used to make a POST request with form data (e.g. for file uploads).
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
  // This function is used to make a PUT request with form data (e.g. for file uploads).
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(responseBody),
};

const Artist = {
  details: (name: string) =>
    requests.get(`${name}?app_id=${BAND_IN_TOWN_API_KEY}`),
};

const ArtistEvent = {
  list: (name: string) =>
    requests.get(`${name}/events?app_id=${BAND_IN_TOWN_API_KEY}&date=all`),
};

const agent = { Artist, ArtistEvent };

export default agent;
