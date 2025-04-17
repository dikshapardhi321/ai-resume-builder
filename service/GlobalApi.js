// const { default: axios } = require("axios");

import axios from "axios";

const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
  baseURL:import.meta.env.VITE_BASE_URL+"/api/",
  headers:{
    'Content-Type':'application/json',
    'Authorization':`Bearer ${API_KEY}`
  }
})

const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);

const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

// const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data);
const UpdateResumeDetail = (id, data) => {
  const cleanId = String(id).replace(/"/g, '').trim();
  return axiosClient.put('/user-resumes/' + cleanId, data);
};

// const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id);
const GetResumeById = (id) => {
  const cleanId = String(id).replace(/"/g, '').trim();
  // ye populate karne se hamara overall information hume mil jayengiu
  return axiosClient.get('/user-resumes/' + cleanId+"?populate=*");
};

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id);


export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
}