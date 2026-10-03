import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
};

export function AttendanceTrendChart({ data }) {
    const chartData = {
        labels: data?.map((d) => d.month) || [],
        datasets: [{
            label: "Attendance %",
            data: data?.map((d) => d.percentage) || [],
            borderColor: "#4ecca3",
            backgroundColor: "rgba(78, 204, 163, 0.1)",
            fill: true,
            tension: 0.4,
        }],
    };
    return (
        <div style={{ height: 300 }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export function TopPerformersChart({ data }) {
    const chartData = {
        labels: data?.map((d) => d.name?.split(" ")[0]) || [],
        datasets: [{
            label: "Average %",
            data: data?.map((d) => d.average) || [],
            backgroundColor: ["#4ecca3", "#45b7aa", "#3ca29b", "#348d8c", "#2b787d"],
        }],
    };
    return (
        <div style={{ height: 300 }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export function SubjectAverageChart({ data }) {
    const chartData = {
        labels: data?.map((d) => d.subject) || [],
        datasets: [{
            label: "Average Marks",
            data: data?.map((d) => d.average) || [],
            backgroundColor: "#0f3460",
        }],
    };
    return (
        <div style={{ height: 300 }}>
            <Bar data={chartData} options={{ ...chartOptions, indexAxis: "y" }} />
        </div>
    );
}

export function PassFailChart({ data }) {
    const chartData = {
        labels: ["Pass", "Fail"],
        datasets: [{
            data: [data?.pass || 0, data?.fail || 0],
            backgroundColor: ["#4ecca3", "#e94560"],
        }],
    };
    return (
        <div style={{ height: 300 }}>
            <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
}

export function StudentGrowthChart({ data }) {
    const chartData = {
        labels: data?.map((d) => d.year) || [],
        datasets: [{
            label: "Students Enrolled",
            data: data?.map((d) => d.students) || [],
            borderColor: "#e94560",
            backgroundColor: "rgba(233, 69, 96, 0.1)",
            fill: true,
            tension: 0.4,
        }],
    };
    return (
        <div style={{ height: 300 }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export function GPALineChart({ data }) {
    const chartData = {
        labels: data?.map((d) => `Sem ${d.semester}`) || [],
        datasets: [{
            label: "GPA",
            data: data?.map((d) => d.gpa) || [],
            borderColor: "#0f3460",
            backgroundColor: "rgba(15, 52, 96, 0.1)",
            fill: true,
            tension: 0.4,
        }],
    };
    return (
        <div style={{ height: 250 }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}
