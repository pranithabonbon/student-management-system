import axios from "axios";
import api from "./api";

const API = "http://localhost:5000/api/students";

export const getStudents = () => api.get("/students");
export const getStudent = (id) => api.get(`/students/${id}`);
export const addStudent = (data) => api.post("/students", data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;
