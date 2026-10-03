import { useEffect, useState } from "react";
import {
    getStudents, addStudent, deleteStudent,
    getFaculty, addFaculty, deleteFaculty,
    getDepartments, addDepartment, deleteDepartment,
    getCourses, addCourse, deleteCourse,
    getTimetable, addTimetable, deleteTimetable,
    getFees, updateFee,
} from "../services/api";
import StudentTable from "../components/StudentTable";

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("students");
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [fees, setFees] = useState([]);
    const [msg, setMsg] = useState("");

    const [studentForm, setStudentForm] = useState({ name: "", email: "", phone: "", rollNumber: "", department: "Computer Science", year: 1 });
    const [facultyForm, setFacultyForm] = useState({ name: "", email: "", phone: "", department: "Computer Science", designation: "Assistant Professor" });
    const [deptForm, setDeptForm] = useState({ name: "", code: "", hod: "" });
    const [courseForm, setCourseForm] = useState({ name: "", code: "", department: "Computer Science", semester: 1, facultyName: "" });
    const [timeForm, setTimeForm] = useState({ day: "Monday", time: "09:00-10:00", subject: "", department: "Computer Science", year: 3, room: "" });

    useEffect(() => { loadAll(); }, []);

    const loadAll = async () => {
        try {
            const [s, f, d, c, t, fe] = await Promise.all([
                getStudents(), getFaculty(), getDepartments(), getCourses(), getTimetable(), getFees(),
            ]);
            setStudents(s.data.data);
            setFaculty(f.data.data);
            setDepartments(d.data.data);
            setCourses(c.data.data);
            setTimetable(t.data.data);
            setFees(fe.data.data);
        } catch (err) { console.error(err); }
    };

    const tabs = [
        { id: "students", label: "Students" },
        { id: "faculty", label: "Faculty" },
        { id: "departments", label: "Departments" },
        { id: "courses", label: "Course Allocation" },
        { id: "timetable", label: "Timetable" },
        { id: "fees", label: "Fee Management" },
        { id: "reports", label: "Reports" },
    ];

    return (
        <div className="dashboard-layout">
            <div className="row g-0">
                <div className="col-md-2 dashboard-sidebar">
                    <div className="px-3 mb-3 text-white">
                        <small className="text-white-50">Admin Portal</small>
                        <h6 className="mb-0">System Admin</h6>
                    </div>
                    <nav className="nav flex-column">
                        {tabs.map((t) => (
                            <button key={t.id} className={`nav-link btn btn-link text-start ${activeTab === t.id ? "active" : ""}`}
                                onClick={() => setActiveTab(t.id)}>{t.label}</button>
                        ))}
                    </nav>
                </div>

                <div className="col-md-10 dashboard-content">
                    <h3 className="mb-4">Admin Dashboard</h3>
                    {msg && <div className="alert alert-success">{msg}</div>}

                    {activeTab === "students" && (
                        <>
                            <div className="chart-card mb-3">
                                <h6 className="section-title">Add Student</h6>
                                <form className="row g-2" onSubmit={async (e) => {
                                    e.preventDefault();
                                    await addStudent(studentForm);
                                    setMsg("Student added"); loadAll();
                                    setStudentForm({ name: "", email: "", phone: "", rollNumber: "", department: "Computer Science", year: 1 });
                                }}>
                                    {["name", "email", "phone", "rollNumber"].map((f) => (
                                        <div key={f} className="col-md-2">
                                            <input className="form-control" placeholder={f} required value={studentForm[f]}
                                                onChange={(e) => setStudentForm({ ...studentForm, [f]: e.target.value })} />
                                        </div>
                                    ))}
                                    <div className="col-md-2">
                                        <select className="form-select" value={studentForm.department}
                                            onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}>
                                            {departments.map((d) => <option key={d._id}>{d.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-1"><button className="btn btn-primary">Add</button></div>
                                </form>
                            </div>
                            <StudentTable students={students} fetchStudents={loadAll} />
                        </>
                    )}

                    {activeTab === "faculty" && (
                        <div className="chart-card">
                            <h6 className="section-title">Manage Faculty</h6>
                            <form className="row g-2 mb-3" onSubmit={async (e) => {
                                e.preventDefault();
                                await addFaculty(facultyForm);
                                setMsg("Faculty added"); loadAll();
                                setFacultyForm({ name: "", email: "", phone: "", department: "Computer Science", designation: "Assistant Professor" });
                            }}>
                                {["name", "email", "phone", "designation"].map((f) => (
                                    <div key={f} className="col-md-2">
                                        <input className="form-control" placeholder={f} required value={facultyForm[f]}
                                            onChange={(e) => setFacultyForm({ ...facultyForm, [f]: e.target.value })} />
                                    </div>
                                ))}
                                <div className="col-md-2"><button className="btn btn-primary">Add Faculty</button></div>
                            </form>
                            <table className="table table-hover">
                                <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Designation</th><th>Action</th></tr></thead>
                                <tbody>
                                    {faculty.map((f) => (
                                        <tr key={f._id}>
                                            <td>{f.name}</td><td>{f.email}</td><td>{f.department}</td><td>{f.designation}</td>
                                            <td><button className="btn btn-danger btn-sm" onClick={async () => { await deleteFaculty(f._id); loadAll(); }}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "departments" && (
                        <div className="chart-card">
                            <h6 className="section-title">Department Management</h6>
                            <form className="row g-2 mb-3" onSubmit={async (e) => {
                                e.preventDefault();
                                await addDepartment(deptForm);
                                setMsg("Department added"); loadAll();
                                setDeptForm({ name: "", code: "", hod: "" });
                            }}>
                                <div className="col-md-3"><input className="form-control" placeholder="Name" required value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} /></div>
                                <div className="col-md-2"><input className="form-control" placeholder="Code" required value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })} /></div>
                                <div className="col-md-3"><input className="form-control" placeholder="HOD" value={deptForm.hod} onChange={(e) => setDeptForm({ ...deptForm, hod: e.target.value })} /></div>
                                <div className="col-md-2"><button className="btn btn-primary">Add</button></div>
                            </form>
                            <div className="row g-3">
                                {departments.map((d) => (
                                    <div key={d._id} className="col-md-4">
                                        <div className="card stat-card">
                                            <div className="card-body">
                                                <h5>{d.name} <small className="text-muted">({d.code})</small></h5>
                                                <p className="mb-1">HOD: {d.hod}</p>
                                                <p className="mb-0 small">Students: {d.totalStudents} | Faculty: {d.totalFaculty}</p>
                                                <button className="btn btn-outline-danger btn-sm mt-2" onClick={async () => { await deleteDepartment(d._id); loadAll(); }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "courses" && (
                        <div className="chart-card">
                            <h6 className="section-title">Course Allocation</h6>
                            <form className="row g-2 mb-3" onSubmit={async (e) => {
                                e.preventDefault();
                                await addCourse(courseForm);
                                setMsg("Course added"); loadAll();
                            }}>
                                <div className="col-md-2"><input className="form-control" placeholder="Course Name" required value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} /></div>
                                <div className="col-md-2"><input className="form-control" placeholder="Code" required value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} /></div>
                                <div className="col-md-2"><input className="form-control" placeholder="Faculty Name" value={courseForm.facultyName} onChange={(e) => setCourseForm({ ...courseForm, facultyName: e.target.value })} /></div>
                                <div className="col-md-2"><input type="number" className="form-control" placeholder="Semester" value={courseForm.semester} onChange={(e) => setCourseForm({ ...courseForm, semester: e.target.value })} /></div>
                                <div className="col-md-2"><button className="btn btn-primary">Allocate</button></div>
                            </form>
                            <table className="table table-hover">
                                <thead><tr><th>Course</th><th>Code</th><th>Department</th><th>Semester</th><th>Faculty</th><th>Action</th></tr></thead>
                                <tbody>
                                    {courses.map((c) => (
                                        <tr key={c._id}>
                                            <td>{c.name}</td><td>{c.code}</td><td>{c.department}</td><td>{c.semester}</td><td>{c.facultyName}</td>
                                            <td><button className="btn btn-danger btn-sm" onClick={async () => { await deleteCourse(c._id); loadAll(); }}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "timetable" && (
                        <div className="chart-card">
                            <h6 className="section-title">Timetable Management</h6>
                            <form className="row g-2 mb-3" onSubmit={async (e) => {
                                e.preventDefault();
                                await addTimetable(timeForm);
                                setMsg("Timetable entry added"); loadAll();
                            }}>
                                <div className="col-md-2">
                                    <select className="form-select" value={timeForm.day} onChange={(e) => setTimeForm({ ...timeForm, day: e.target.value })}>
                                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-2"><input className="form-control" placeholder="Time" value={timeForm.time} onChange={(e) => setTimeForm({ ...timeForm, time: e.target.value })} /></div>
                                <div className="col-md-2"><input className="form-control" placeholder="Subject" required value={timeForm.subject} onChange={(e) => setTimeForm({ ...timeForm, subject: e.target.value })} /></div>
                                <div className="col-md-2"><input className="form-control" placeholder="Room" value={timeForm.room} onChange={(e) => setTimeForm({ ...timeForm, room: e.target.value })} /></div>
                                <div className="col-md-2"><button className="btn btn-primary">Add</button></div>
                            </form>
                            <table className="table table-hover">
                                <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Department</th><th>Room</th><th>Faculty</th><th>Action</th></tr></thead>
                                <tbody>
                                    {timetable.map((t) => (
                                        <tr key={t._id}>
                                            <td>{t.day}</td><td>{t.time}</td><td>{t.subject}</td><td>{t.department}</td><td>{t.room}</td><td>{t.facultyName}</td>
                                            <td><button className="btn btn-danger btn-sm" onClick={async () => { await deleteTimetable(t._id); loadAll(); }}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "fees" && (
                        <div className="chart-card">
                            <h6 className="section-title">Fee Management</h6>
                            <table className="table table-hover">
                                <thead><tr><th>Student</th><th>Amount</th><th>Paid</th><th>Status</th><th>Action</th></tr></thead>
                                <tbody>
                                    {fees.map((f) => (
                                        <tr key={f._id}>
                                            <td>{f.studentName}</td>
                                            <td>₹{f.amount}</td>
                                            <td>₹{f.paidAmount}</td>
                                            <td><span className={`badge fee-badge-${f.status}`}>{f.status}</span></td>
                                            <td>
                                                <button className="btn btn-success btn-sm me-1" onClick={async () => {
                                                    await updateFee(f._id, { paidAmount: f.amount, status: "paid" });
                                                    setMsg("Fee marked as paid"); loadAll();
                                                }}>Mark Paid</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "reports" && (
                        <div className="chart-card">
                            <h6 className="section-title">Quick Reports</h6>
                            <div className="row g-3">
                                <div className="col-md-3"><div className="card stat-card"><div className="card-body text-center"><h5>Total Students</h5><h2 className="text-primary">{students.length}</h2></div></div></div>
                                <div className="col-md-3"><div className="card stat-card"><div className="card-body text-center"><h5>Total Faculty</h5><h2 className="text-success">{faculty.length}</h2></div></div></div>
                                <div className="col-md-3"><div className="card stat-card"><div className="card-body text-center"><h5>Departments</h5><h2 className="text-info">{departments.length}</h2></div></div></div>
                                <div className="col-md-3"><div className="card stat-card"><div className="card-body text-center"><h5>Courses</h5><h2 className="text-warning">{courses.length}</h2></div></div></div>
                            </div>
                            <div className="mt-4">
                                <h6>Fee Collection Summary</h6>
                                <table className="table table-sm">
                                    <tbody>
                                        <tr><td>Paid</td><td>{fees.filter((f) => f.status === "paid").length}</td></tr>
                                        <tr><td>Pending</td><td>{fees.filter((f) => f.status === "pending").length}</td></tr>
                                        <tr><td>Overdue</td><td>{fees.filter((f) => f.status === "overdue").length}</td></tr>
                                        <tr><td>Total Collected</td><td>₹{fees.reduce((s, f) => s + f.paidAmount, 0).toLocaleString()}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-muted mt-3">For detailed charts, visit the <a href="/analytics">Analytics Dashboard</a></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
