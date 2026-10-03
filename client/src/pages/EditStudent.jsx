import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudent, updateStudent } from "../services/studentService";

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
    });

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const res = await getStudent(id);

            setStudent({
                ...res.data.data,
                year: String(res.data.data.year), // Convert number to string
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateStudent(id, {
            ...student,
            year: Number(student.year), // Convert back to number
        });

        alert("Student Updated Successfully");
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow">
                <h2 className="mb-4">Edit Student</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            className="form-control"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Phone</label>
                        <input
                            className="form-control"
                            name="phone"
                            value={student.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Department</label>

                        <select
                            className="form-select"
                            name="department"
                            value={student.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="IT">IT</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Civil">Civil</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Year</label>

                        <select
                            className="form-select"
                            name="year"
                            value={student.year}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>

                    <button className="btn btn-success">
                        Update Student
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditStudent;