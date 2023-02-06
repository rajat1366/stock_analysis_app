import axios from "axios";

const REST_API_URL="http://localhost:8080/api/get/"
export const getStockData = (params)=>{
    return axios.get(REST_API_URL,{params});
}