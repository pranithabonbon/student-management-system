import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../services/studentService";

function AddStudent() {
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                !student.name ||
                !student.email ||
                !student.phone ||
                !student.department ||
                !student.year
            ) {
                alert("Please fill all fields");
                return;
            }
            await addStudent(student);
            alert("Student Added Successfully");
            navigate("/");
        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert(error.response?.data?.message || "Failed to add student");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h2 className="mb-4">Add Student</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
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
                            type="text"
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

                    <button className="btn btn-primary">
                        Add Student
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddStudent;