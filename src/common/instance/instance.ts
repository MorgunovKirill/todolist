import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "97103ee0-8697-48f6-acf9-551ee6a7a329",
    },
});

