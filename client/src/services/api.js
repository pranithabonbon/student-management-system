import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE });

export const login = (credentials) => api.post("/auth/login", credentials);

export const getStudents = () => api.get("/students");
export const getStudent = (id) => api.get(`/students/${id}`);
export const getStudentDashboard = (id) => api.get(`/students/${id}/dashboard`);
export const addStudent = (data) => api.post("/students", data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export const getFaculty = () => api.get("/faculty");
export const addFaculty = (data) => api.post("/faculty", data);
export const updateFaculty = (id, data) => api.put(`/faculty/${id}`, data);
export const deleteFaculty = (id) => api.delete(`/faculty/${id}`);

export const getDepartments = () => api.get("/departments");
export const addDepartment = (data) => api.post("/departments", data);
export const updateDepartment = (id, data) => api.put(`/departments/${id}`, data);
export const deleteDepartment = (id) => api.delete(`/departments/${id}`);

export const getCourses = () => api.get("/courses");
export const addCourse = (data) => api.post("/courses", data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

export const markAttendance = (data) => api.post("/attendance", data);
export const markBulkAttendance = (data) => api.post("/attendance/bulk", data);
export const getAttendance = (params) => api.get("/attendance", { params });

export const generateQR = (data) => api.post("/qr/generate", data);
export const scanQR = (data) => api.post("/qr/scan", data);

export const uploadMarks = (data) => api.post("/marks", data);
export const getMarks = (params) => api.get("/marks", { params });

export const getStudyMaterials = (params) => api.get("/materials", { params });
export const addStudyMaterial = (data) => api.post("/materials", data);
export const getAnnouncements = () => api.get("/announcements");
export const addAnnouncement = (data) => api.post("/announcements", data);
export const getAssignments = () => api.get("/assignments");
export const addAssignment = (data) => api.post("/assignments", data);
export const getNotifications = (params) => api.get("/notifications", { params });
export const getTimetable = (params) => api.get("/timetable", { params });
export const addTimetable = (data) => api.post("/timetable", data);
export const deleteTimetable = (id) => api.delete(`/timetable/${id}`);
export const getFees = () => api.get("/fees");
export const addFee = (data) => api.post("/fees", data);
export const updateFee = (id, data) => api.put(`/fees/${id}`, data);

export const getAnalytics = () => api.get("/analytics");
export const getFacultyAnalytics = () => api.get("/analytics/faculty");

export default api;
