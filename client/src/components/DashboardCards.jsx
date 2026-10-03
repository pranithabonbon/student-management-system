function DashboardCards({ students }) {
    const departments = [...new Set(students.map((s) => s.department))];

    return (
        <div className="row mb-4">

            <div className="col-md-4">
                <div className="card text-bg-primary">
                    <div className="card-body text-center">
                        <h5>Total Students</h5>
                        <h2>{students.length}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card text-bg-success">
                    <div className="card-body text-center">
                        <h5>Departments</h5>
                        <h2>{departments.length}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card text-bg-warning">
                    <div className="card-body text-center">
                        <h5>Latest Student</h5>
                        <h6>{students[students.length - 1]?.name || "None"}</h6>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DashboardCards;