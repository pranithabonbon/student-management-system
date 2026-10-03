import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentDashboard } from "../services/api";
import { GPALineChart } from "../components/charts/ChartComponents";
import { Html5QrcodeScanner } from "html5-qrcode";
import { scanQR } from "../services/api";

function StudentDashboard() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [scanMsg, setScanMsg] = useState("");

    useEffect(() => {
        if (user?.profileId) fetchDashboard();
    }, [user]);

    const fetchDashboard = async () => {
        try {
            const res = await getStudentDashboard(user.profileId);
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab !== "scan") return;
        const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
        scanner.render(
            async (decodedText) => {
                try {
                    const qrData = JSON.parse(decodedText);
                    await scanQR({ token: qrData.token, studentId: user.profileId });
                    setScanMsg("✅ Attendance marked successfully!");
                    scanner.clear();
                    fetchDashboard();
                } catch {
                    setScanMsg("❌ Failed to mark attendance. QR may be expired.");
                }
            },
            () => {}
        );
        return () => scanner.clear().catch(() => {});
    }, [activeTab]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
    if (!data) return <div className="alert alert-danger m-4">Failed to load dashboard</div>;

    const { student, assignments, notifications } = data;
    const feePercent = Math.round((student.feePaid / student.feeAmount) * 100);

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "subjects", label: "Subjects" },
        { id: "assignments", label: "Assignments" },
        { id: "notifications", label: "Notifications" },
        { id: "scan", label: "📷 Scan QR" },
    ];

    return (
        <div className="dashboard-layout">
            <div className="row g-0">
                <div className="col-md-2 dashboard-sidebar">
                    <div className="px-3 mb-3 text-white">
                        <small className="text-white-50">Student Portal</small>
                        <h6 className="mb-0">{student.name}</h6>
                    </div>
                    <nav className="nav flex-column">
                        {tabs.map((t) => (
                            <button key={t.id} className={`nav-link btn btn-link text-start ${activeTab === t.id ? "active" : ""}`}
                                onClick={() => setActiveTab(t.id)}>{t.label}</button>
                        ))}
                    </nav>
                </div>

                <div className="col-md-10 dashboard-content">
                    <h3 className="mb-4">Student Dashboard</h3>

                    {activeTab === "overview" && (
                        <>
                            <div className="row g-3 mb-4">
                                <div className="col-md-3">
                                    <div className="card stat-card">
                                        <div className="card-body d-flex align-items-center gap-3">
                                            <div className="stat-icon bg-primary bg-opacity-10">👤</div>
                                            <div>
                                                <small className="text-muted">Roll No</small>
                                                <h5 className="mb-0">{student.rollNumber}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card stat-card">
                                        <div className="card-body d-flex align-items-center gap-3">
                                            <div className="stat-icon bg-success bg-opacity-10">📊</div>
                                            <div>
                                                <small className="text-muted">Attendance</small>
                                                <h5 className="mb-0">{student.attendancePercentage}%</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card stat-card">
                                        <div className="card-body d-flex align-items-center gap-3">
                                            <div className="stat-icon bg-info bg-opacity-10">🎯</div>
                                            <div>
                                                <small className="text-muted">GPA</small>
                                                <h5 className="mb-0">{student.gpa}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card stat-card">
                                        <div className="card-body d-flex align-items-center gap-3">
                                            <div className="stat-icon bg-warning bg-opacity-10">💰</div>
                                            <div>
                                                <small className="text-muted">Fee Status</small>
                                                <span className={`badge fee-badge-${student.feeStatus}`}>{student.feeStatus}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="chart-card">
                                        <h6 className="section-title">Semester GPA Trend</h6>
                                        <GPALineChart data={student.gpaHistory} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="chart-card">
                                        <h6 className="section-title">Profile</h6>
                                        <table className="table table-sm">
                                            <tbody>
                                                <tr><td>Email</td><td>{student.email}</td></tr>
                                                <tr><td>Phone</td><td>{student.phone}</td></tr>
                                                <tr><td>Department</td><td>{student.department}</td></tr>
                                                <tr><td>Year</td><td>{student.year}</td></tr>
                                                <tr><td>Semester</td><td>{student.semester}</td></tr>
                                            </tbody>
                                        </table>
                                        <h6 className="mt-3">Fee Progress</h6>
                                        <div className="progress" style={{ height: 20 }}>
                                            <div className="progress-bar bg-success" style={{ width: `${feePercent}%` }}>
                                                ₹{student.feePaid} / ₹{student.feeAmount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "subjects" && (
                        <div className="chart-card">
                            <h6 className="section-title">Enrolled Subjects</h6>
                            <div className="row g-3">
                                {student.subjects.map((sub, i) => (
                                    <div key={i} className="col-md-4">
                                        <div className="card border-0 bg-light">
                                            <div className="card-body">
                                                <h6>{sub}</h6>
                                                <small className="text-muted">Semester {student.semester}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "assignments" && (
                        <div className="chart-card">
                            <h6 className="section-title">Upcoming Assignments</h6>
                            {assignments.length === 0 ? (
                                <p className="text-muted">No upcoming assignments</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead><tr><th>Title</th><th>Subject</th><th>Due Date</th><th>Description</th></tr></thead>
                                        <tbody>
                                            {assignments.map((a) => (
                                                <tr key={a._id}>
                                                    <td>{a.title}</td>
                                                    <td><span className="badge bg-primary">{a.subject}</span></td>
                                                    <td>{new Date(a.dueDate).toLocaleDateString()}</td>
                                                    <td>{a.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="chart-card">
                            <h6 className="section-title">Notifications</h6>
                            {notifications.map((n) => (
                                <div key={n._id} className={`notification-item ${n.type}`}>
                                    <strong>{n.title}</strong>
                                    <p className="mb-0 small">{n.message}</p>
                                    <small className="text-muted">{new Date(n.createdAt).toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "scan" && (
                        <div className="chart-card">
                            <h6 className="section-title">Scan QR for Attendance</h6>
                            <p className="text-muted">Point your camera at the QR code displayed by your teacher</p>
                            {scanMsg && <div className="alert alert-info">{scanMsg}</div>}
                            <div id="qr-reader" style={{ maxWidth: 500, margin: "0 auto" }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
