import { deleteStudent } from "../services/api";

function StudentTable({ students, fetchStudents }) {
    const handleDelete = async (id) => {
        if (window.confirm("Delete Student?")) {
            await deleteStudent(id);
            fetchStudents();
        }
    };

    return (
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Attendance</th>
                    <th>Fee</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student._id}>
                        <td>{student.rollNumber || "—"}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.department}</td>
                        <td>{student.year}</td>
                        <td>{student.attendancePercentage ?? 0}%</td>
                        <td><span className={`badge fee-badge-${student.feeStatus || "pending"}`}>{student.feeStatus || "pending"}</span></td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentTable;
