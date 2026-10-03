import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";
import {
    AttendanceTrendChart, TopPerformersChart, SubjectAverageChart,
    PassFailChart, StudentGrowthChart,
} from "../components/charts/ChartComponents";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

const COLORS = ["#4ecca3", "#0f3460", "#e94560", "#ffc107", "#17a2b8"];

function Analytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAnalytics().then((res) => setData(res.data.data)).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
    if (!data) return <div className="alert alert-danger m-4">Failed to load analytics</div>;

    return (
        <div className="dashboard-content">
            <h3 className="mb-4">📊 Analytics Dashboard</h3>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card stat-card"><div className="card-body text-center">
                        <h6 className="text-muted">Total Students</h6><h2 className="text-primary">{data.totalStudents}</h2>
                    </div></div>
                </div>
                <div className="col-md-3">
                    <div className="card stat-card"><div className="card-body text-center">
                        <h6 className="text-muted">Avg Attendance</h6><h2 className="text-success">{data.averageAttendance}%</h2>
                    </div></div>
                </div>
                <div className="col-md-3">
                    <div className="card stat-card"><div className="card-body text-center">
                        <h6 className="text-muted">Avg GPA</h6><h2 className="text-info">{data.averageGPA}</h2>
                    </div></div>
                </div>
                <div className="col-md-3">
                    <div className="card stat-card"><div className="card-body text-center">
                        <h6 className="text-muted">Pass Rate</h6>
                        <h2 className="text-warning">
                            {data.passFailRatio.pass + data.passFailRatio.fail > 0
                                ? Math.round((data.passFailRatio.pass / (data.passFailRatio.pass + data.passFailRatio.fail)) * 100)
                                : 0}%
                        </h2>
                    </div></div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="chart-card">
                        <h6 className="section-title">Attendance Trends (Chart.js)</h6>
                        <AttendanceTrendChart data={data.attendanceTrends} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="chart-card">
                        <h6 className="section-title">Top Performers (Chart.js)</h6>
                        <TopPerformersChart data={data.topPerformers} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="chart-card">
                        <h6 className="section-title">Subject-wise Average Marks (Chart.js)</h6>
                        <SubjectAverageChart data={data.subjectWiseAverage} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="chart-card">
                        <h6 className="section-title">Pass / Fail Ratio (Chart.js)</h6>
                        <PassFailChart data={data.passFailRatio} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="chart-card">
                        <h6 className="section-title">Student Growth Every Year (Chart.js)</h6>
                        <StudentGrowthChart data={data.studentGrowth} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="chart-card">
                        <h6 className="section-title">Department Distribution (Recharts)</h6>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={data.departmentStats} dataKey="count" nameKey="name" cx="50%" cy="50%"
                                    outerRadius={100} label={({ name, count }) => `${name}: ${count}`}>
                                    {data.departmentStats.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="chart-card">
                        <h6 className="section-title">Subject Performance Comparison (Recharts)</h6>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.subjectWiseAverage}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="average" fill="#0f3460" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="chart-card">
                        <h6 className="section-title">Enrollment Trend (Recharts)</h6>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.studentGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="students" stroke="#e94560" strokeWidth={2} dot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
