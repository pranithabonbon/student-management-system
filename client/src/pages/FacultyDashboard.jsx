import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "../context/AuthContext";
import {
    getStudents, markBulkAttendance, generateQR, uploadMarks,
    addStudyMaterial, addAnnouncement, getFacultyAnalytics, getAnnouncements, getStudyMaterials,
} from "../services/api";
import { SubjectAverageChart } from "../components/charts/ChartComponents";

function FacultyDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("attendance");
    const [students, setStudents] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [attendanceForm, setAttendanceForm] = useState({ subject: "Data Structures", status: "present" });
    const [marksForm, setMarksForm] = useState({ studentId: "", subject: "Data Structures", marks: "", maxMarks: 100 });
    const [materialForm, setMaterialForm] = useState({ title: "", subject: "Data Structures", description: "", fileUrl: "" });
    const [announceForm, setAnnounceForm] = useState({ title: "", content: "", priority: "medium" });
    const [qrData, setQrData] = useState(null);
    const [msg, setMsg] = useState("");

    const subjects = user?.profile?.subjects || ["Data Structures", "Algorithms"];

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const [stuRes, anaRes, annRes, matRes] = await Promise.all([
                getStudents(), getFacultyAnalytics(), getAnnouncements(), getStudyMaterials(),
            ]);
            setStudents(stuRes.data.data);
            setAnalytics(anaRes.data.data);
            setAnnouncements(annRes.data.data);
            setMaterials(matRes.data.data);
        } catch (err) { console.error(err); }
    };

    const handleBulkAttendance = async () => {
        if (selectedStudents.length === 0) return setMsg("Select at least one student");
        try {
            await markBulkAttendance({ students: selectedStudents, subject: attendanceForm.subject, status: attendanceForm.status });
            setMsg("✅ Attendance marked for " + selectedStudents.length + " students");
            setSelectedStudents([]);
        } catch { setMsg("❌ Failed to mark attendance"); }
    };

    const handleGenerateQR = async () => {
        try {
            const res = await generateQR({
                subject: attendanceForm.subject,
                facultyId: user.profileId,
                facultyName: user.name,
            });
            setQrData(res.data.data);
            setMsg("✅ QR code generated! Valid for 15 minutes.");
        } catch { setMsg("❌ Failed to generate QR"); }
    };

    const handleUploadMarks = async (e) => {
        e.preventDefault();
        try {
            await uploadMarks({ ...marksForm, marks: Number(marksForm.marks), semester: 5 });
            setMsg("✅ Marks uploaded successfully");
            setMarksForm({ ...marksForm, marks: "" });
        } catch { setMsg("❌ Failed to upload marks"); }
    };

    const handleAddMaterial = async (e) => {
        e.preventDefault();
        try {
            await addStudyMaterial({ ...materialForm, facultyId: user.profileId, facultyName: user.name });
            setMsg("✅ Study material uploaded");
            setMaterialForm({ title: "", subject: subjects[0], description: "", fileUrl: "" });
            loadData();
        } catch { setMsg("❌ Failed to upload material"); }
    };

    const handleAnnouncement = async (e) => {
        e.preventDefault();
        try {
            await addAnnouncement({ ...announceForm, facultyId: user.profileId, facultyName: user.name, department: user.profile?.department });
            setMsg("✅ Announcement posted");
            setAnnounceForm({ title: "", content: "", priority: "medium" });
            loadData();
        } catch { setMsg("❌ Failed to post announcement"); }
    };

    const toggleStudent = (id) => {
        setSelectedStudents((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
    };

    const tabs = [
        { id: "attendance", label: "Mark Attendance" },
        { id: "qr", label: "📱 QR Attendance" },
        { id: "marks", label: "Upload Marks" },
        { id: "materials", label: "Study Materials" },
        { id: "announcements", label: "Announcements" },
        { id: "analytics", label: "Performance Analytics" },
    ];

    return (
        <div className="dashboard-layout">
            <div className="row g-0">
                <div className="col-md-2 dashboard-sidebar">
                    <div className="px-3 mb-3 text-white">
                        <small className="text-white-50">Faculty Portal</small>
                        <h6 className="mb-0">{user?.name}</h6>
                    </div>
                    <nav className="nav flex-column">
                        {tabs.map((t) => (
                            <button key={t.id} className={`nav-link btn btn-link text-start ${activeTab === t.id ? "active" : ""}`}
                                onClick={() => { setActiveTab(t.id); setMsg(""); }}>{t.label}</button>
                        ))}
                    </nav>
                </div>

                <div className="col-md-10 dashboard-content">
                    <h3 className="mb-4">Faculty Dashboard</h3>
                    {msg && <div className="alert alert-info">{msg}</div>}

                    {activeTab === "attendance" && (
                        <div className="chart-card">
                            <h6 className="section-title">Manual Attendance</h6>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <select className="form-select" value={attendanceForm.subject}
                                        onChange={(e) => setAttendanceForm({ ...attendanceForm, subject: e.target.value })}>
                                        {subjects.map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select" value={attendanceForm.status}
                                        onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}>
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-primary" onClick={handleBulkAttendance}>
                                        Mark Selected ({selectedStudents.length})
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead><tr><th></th><th>Roll No</th><th>Name</th><th>Department</th><th>Attendance %</th></tr></thead>
                                    <tbody>
                                        {students.map((s) => (
                                            <tr key={s._id}>
                                                <td><input type="checkbox" checked={selectedStudents.includes(s._id)} onChange={() => toggleStudent(s._id)} /></td>
                                                <td>{s.rollNumber}</td><td>{s.name}</td><td>{s.department}</td>
                                                <td><span className={`badge ${s.attendancePercentage >= 75 ? "bg-success" : "bg-danger"}`}>{s.attendancePercentage}%</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "qr" && (
                        <div className="chart-card">
                            <h6 className="section-title">QR Attendance</h6>
                            <p className="text-muted">Generate a QR code for students to scan and mark attendance automatically</p>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <select className="form-select" value={attendanceForm.subject}
                                        onChange={(e) => setAttendanceForm({ ...attendanceForm, subject: e.target.value })}>
                                        {subjects.map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-success" onClick={handleGenerateQR}>Generate QR Code</button>
                                </div>
                            </div>
                            {qrData && (
                                <div className="qr-container">
                                    <QRCodeSVG value={qrData.qrData} size={256} />
                                    <p className="mt-3"><strong>Subject:</strong> {qrData.subject}</p>
                                    <p><strong>Expires:</strong> {new Date(qrData.expiresAt).toLocaleTimeString()}</p>
                                    <p className="text-muted small">Students can scan this from their dashboard</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "marks" && (
                        <div className="chart-card">
                            <h6 className="section-title">Upload Marks</h6>
                            <form onSubmit={handleUploadMarks} className="row g-3">
                                <div className="col-md-4">
                                    <select className="form-select" value={marksForm.studentId} required
                                        onChange={(e) => setMarksForm({ ...marksForm, studentId: e.target.value })}>
                                        <option value="">Select Student</option>
                                        {students.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.rollNumber})</option>)}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select className="form-select" value={marksForm.subject}
                                        onChange={(e) => setMarksForm({ ...marksForm, subject: e.target.value })}>
                                        {subjects.map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <input type="number" className="form-control" placeholder="Marks" required
                                        value={marksForm.marks} onChange={(e) => setMarksForm({ ...marksForm, marks: e.target.value })} />
                                </div>
                                <div className="col-md-2">
                                    <input type="number" className="form-control" placeholder="Max"
                                        value={marksForm.maxMarks} onChange={(e) => setMarksForm({ ...marksForm, maxMarks: e.target.value })} />
                                </div>
                                <div className="col-md-1">
                                    <button type="submit" className="btn btn-primary">Upload</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === "materials" && (
                        <>
                            <div className="chart-card">
                                <h6 className="section-title">Upload Study Material</h6>
                                <form onSubmit={handleAddMaterial} className="row g-3">
                                    <div className="col-md-3"><input className="form-control" placeholder="Title" required value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} /></div>
                                    <div className="col-md-2">
                                        <select className="form-select" value={materialForm.subject} onChange={(e) => setMaterialForm({ ...materialForm, subject: e.target.value })}>
                                            {subjects.map((s) => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-3"><input className="form-control" placeholder="Description" value={materialForm.description} onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })} /></div>
                                    <div className="col-md-3"><input className="form-control" placeholder="File URL" value={materialForm.fileUrl} onChange={(e) => setMaterialForm({ ...materialForm, fileUrl: e.target.value })} /></div>
                                    <div className="col-md-1"><button type="submit" className="btn btn-primary">Add</button></div>
                                </form>
                            </div>
                            <div className="chart-card">
                                <h6 className="section-title">Uploaded Materials</h6>
                                <div className="table-responsive">
                                    <table className="table"><thead><tr><th>Title</th><th>Subject</th><th>Faculty</th></tr></thead>
                                        <tbody>{materials.map((m) => <tr key={m._id}><td>{m.title}</td><td>{m.subject}</td><td>{m.facultyName}</td></tr>)}</tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "announcements" && (
                        <>
                            <div className="chart-card">
                                <h6 className="section-title">Post Announcement</h6>
                                <form onSubmit={handleAnnouncement} className="row g-3">
                                    <div className="col-md-4"><input className="form-control" placeholder="Title" required value={announceForm.title} onChange={(e) => setAnnounceForm({ ...announceForm, title: e.target.value })} /></div>
                                    <div className="col-md-5"><input className="form-control" placeholder="Content" required value={announceForm.content} onChange={(e) => setAnnounceForm({ ...announceForm, content: e.target.value })} /></div>
                                    <div className="col-md-2">
                                        <select className="form-select" value={announceForm.priority} onChange={(e) => setAnnounceForm({ ...announceForm, priority: e.target.value })}>
                                            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                                        </select>
                                    </div>
                                    <div className="col-md-1"><button type="submit" className="btn btn-primary">Post</button></div>
                                </form>
                            </div>
                            <div className="chart-card">
                                <h6 className="section-title">Recent Announcements</h6>
                                {announcements.map((a) => (
                                    <div key={a._id} className={`notification-item ${a.priority === "high" ? "alert" : ""}`}>
                                        <strong>{a.title}</strong> <span className="badge bg-secondary">{a.priority}</span>
                                        <p className="mb-0 small">{a.content}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === "analytics" && analytics && (
                        <div className="chart-card">
                            <h6 className="section-title">Student Performance Analytics</h6>
                            <div className="row mb-3">
                                <div className="col-md-4"><div className="card stat-card"><div className="card-body text-center"><h5>Total Students</h5><h2>{analytics.totalStudents}</h2></div></div></div>
                            </div>
                            <SubjectAverageChart data={analytics.subjectWiseAverage} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FacultyDashboard;
