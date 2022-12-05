import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-c8815/us-central1/api' // The API (clound function) URL
})

export default instance;