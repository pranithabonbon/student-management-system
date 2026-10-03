import { useEffect, useState } from "react";
import StudentTable from "../components/StudentTable";
import { getStudents } from "../services/studentService";
import DashboardCards from "../components/DashboardCards";

function Home() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await getStudents();
            setStudents(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border"></div>
            </div>
        );
    }

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">

            <h2>Student Management System</h2>

            <DashboardCards students={students} />

            <input
                type="text"
                className="form-control my-3"
                placeholder="Search Student"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {
                filteredStudents.length === 0 ? (
                    <div className="alert alert-warning">
                        No Students Found
                    </div>
                ) : (
                    <StudentTable
                        students={filteredStudents}
                        fetchStudents={fetchStudents}
                    />
                )
            }

        </div>
    );
}

export default Home;