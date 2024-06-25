import axios from "axios";

export const addLink = async (URL) => {
    // console.log()
    const response = await axios.post('http://localhost:4000/', {URL})
    return response;
}

export const addIP = async (URL) => {
    const response = await axios.patch('http://localhost:4000/addIP', {URL})
    return response;
}