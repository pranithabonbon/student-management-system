const User = require("../models/User");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Department = require("../models/Department");
const Course = require("../models/Course");
const Mark = require("../models/Mark");
const Attendance = require("../models/Attendance");
const Assignment = require("../models/Assignment");
const Notification = require("../models/Notification");
const Announcement = require("../models/Announcement");
const StudyMaterial = require("../models/StudyMaterial");
const Timetable = require("../models/Timetable");
const Fee = require("../models/Fee");

async function seedDatabase() {
    try {
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            console.log("📦 Database already seeded, skipping...");
            return;
        }

        console.log("🌱 Seeding database...");

        const departments = await Department.insertMany([
            { name: "Computer Science", code: "CSE", hod: "Dr. Sharma", totalStudents: 3, totalFaculty: 2 },
            { name: "Electronics", code: "ECE", hod: "Dr. Patel", totalStudents: 1, totalFaculty: 1 },
            { name: "Mechanical", code: "ME", hod: "Dr. Kumar", totalStudents: 1, totalFaculty: 1 },
        ]);

        const faculty1 = await Faculty.create({
            name: "Dr. Rajesh Kumar",
            email: "rajesh@cse.edu",
            phone: "9876543210",
            department: "Computer Science",
            designation: "Professor",
            subjects: ["Data Structures", "Algorithms"],
        });

        const faculty2 = await Faculty.create({
            name: "Dr. Priya Sharma",
            email: "priya@cse.edu",
            phone: "9876543211",
            department: "Computer Science",
            designation: "Associate Professor",
            subjects: ["Database Systems", "Web Development"],
        });

        const faculty3 = await Faculty.create({
            name: "Dr. Amit Patel",
            email: "amit@ece.edu",
            phone: "9876543212",
            department: "Electronics",
            designation: "Assistant Professor",
            subjects: ["Digital Electronics"],
        });

        const students = await Student.insertMany([
            {
                name: "Rahul Verma",
                email: "rahul@student.edu",
                phone: "9123456780",
                rollNumber: "CSE001",
                department: "Computer Science",
                year: 3,
                semester: 5,
                gpa: 8.5,
                gpaHistory: [{ semester: 1, gpa: 7.8 }, { semester: 2, gpa: 8.0 }, { semester: 3, gpa: 8.2 }, { semester: 4, gpa: 8.5 }],
                subjects: ["Data Structures", "Database Systems", "Web Development", "Algorithms"],
                feeStatus: "paid",
                feeAmount: 50000,
                feePaid: 50000,
                attendancePercentage: 92,
            },
            {
                name: "Sneha Reddy",
                email: "sneha@student.edu",
                phone: "9123456781",
                rollNumber: "CSE002",
                department: "Computer Science",
                year: 3,
                semester: 5,
                gpa: 9.2,
                gpaHistory: [{ semester: 1, gpa: 8.5 }, { semester: 2, gpa: 8.8 }, { semester: 3, gpa: 9.0 }, { semester: 4, gpa: 9.2 }],
                subjects: ["Data Structures", "Database Systems", "Web Development", "Algorithms"],
                feeStatus: "pending",
                feeAmount: 50000,
                feePaid: 25000,
                attendancePercentage: 88,
            },
            {
                name: "Arjun Singh",
                email: "arjun@student.edu",
                phone: "9123456782",
                rollNumber: "CSE003",
                department: "Computer Science",
                year: 2,
                semester: 3,
                gpa: 7.5,
                gpaHistory: [{ semester: 1, gpa: 7.0 }, { semester: 2, gpa: 7.5 }],
                subjects: ["Data Structures", "Database Systems"],
                feeStatus: "overdue",
                feeAmount: 50000,
                feePaid: 10000,
                attendancePercentage: 75,
            },
            {
                name: "Kavya Nair",
                email: "kavya@student.edu",
                phone: "9123456783",
                rollNumber: "ECE001",
                department: "Electronics",
                year: 3,
                semester: 5,
                gpa: 8.8,
                gpaHistory: [{ semester: 1, gpa: 8.0 }, { semester: 2, gpa: 8.3 }, { semester: 3, gpa: 8.5 }, { semester: 4, gpa: 8.8 }],
                subjects: ["Digital Electronics"],
                feeStatus: "paid",
                feeAmount: 50000,
                feePaid: 50000,
                attendancePercentage: 95,
            },
        ]);

        await User.insertMany([
            { email: "rahul@student.edu", password: "123456", role: "student", profileId: students[0]._id, name: "Rahul Verma" },
            { email: "sneha@student.edu", password: "123456", role: "student", profileId: students[1]._id, name: "Sneha Reddy" },
            { email: "rajesh@cse.edu", password: "123456", role: "faculty", profileId: faculty1._id, name: "Dr. Rajesh Kumar" },
            { email: "priya@cse.edu", password: "123456", role: "faculty", profileId: faculty2._id, name: "Dr. Priya Sharma" },
            { email: "admin@edu.com", password: "admin123", role: "admin", name: "System Admin" },
        ]);

        await Course.insertMany([
            { name: "Data Structures", code: "CSE301", department: "Computer Science", semester: 3, credits: 4, facultyId: faculty1._id, facultyName: faculty1.name },
            { name: "Database Systems", code: "CSE302", department: "Computer Science", semester: 3, credits: 4, facultyId: faculty2._id, facultyName: faculty2.name },
            { name: "Web Development", code: "CSE401", department: "Computer Science", semester: 5, credits: 3, facultyId: faculty2._id, facultyName: faculty2.name },
            { name: "Algorithms", code: "CSE402", department: "Computer Science", semester: 5, credits: 4, facultyId: faculty1._id, facultyName: faculty1.name },
        ]);

        const subjects = ["Data Structures", "Database Systems", "Web Development", "Algorithms"];
        const months = ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025"];

        for (const student of students) {
            for (let i = 0; i < 20; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i * 3);
                await Attendance.create({
                    studentId: student._id,
                    studentName: student.name,
                    subject: subjects[i % subjects.length],
                    date,
                    status: Math.random() > 0.15 ? "present" : "absent",
                    method: i % 5 === 0 ? "qr" : "manual",
                });
            }

            for (const subject of student.subjects) {
                await Mark.create({
                    studentId: student._id,
                    studentName: student.name,
                    subject,
                    marks: Math.floor(Math.random() * 40) + 55,
                    maxMarks: 100,
                    examType: "Internal",
                    semester: student.semester,
                });
            }

            await Fee.create({
                studentId: student._id,
                studentName: student.name,
                amount: student.feeAmount,
                paidAmount: student.feePaid,
                status: student.feeStatus,
                semester: student.semester,
                dueDate: new Date("2025-12-31"),
            });
        }

        await Assignment.insertMany([
            { title: "Binary Tree Implementation", subject: "Data Structures", description: "Implement BST with all operations", dueDate: new Date("2025-07-15"), department: "Computer Science", facultyId: faculty1._id },
            { title: "SQL Queries Assignment", subject: "Database Systems", description: "Write complex SQL queries", dueDate: new Date("2025-07-20"), department: "Computer Science", facultyId: faculty2._id },
            { title: "React Portfolio Project", subject: "Web Development", description: "Build a personal portfolio using React", dueDate: new Date("2025-08-01"), department: "Computer Science", facultyId: faculty2._id },
            { title: "Sorting Algorithm Analysis", subject: "Algorithms", description: "Compare sorting algorithms", dueDate: new Date("2025-07-25"), department: "Computer Science", facultyId: faculty1._id },
        ]);

        await Notification.insertMany([
            { title: "Exam Schedule Released", message: "Mid-semester exams start from July 10th", type: "info", targetRole: "all" },
            { title: "Fee Reminder", message: "Please clear pending fees before July 15th", type: "warning", targetRole: "student" },
            { title: "Welcome!", message: "Welcome to the new academic session 2025-26", type: "success", targetRole: "all" },
        ]);

        await Announcement.insertMany([
            { title: "Guest Lecture on AI", content: "Industry expert lecture on AI/ML on July 5th at Auditorium", department: "Computer Science", facultyId: faculty1._id, facultyName: faculty1.name, priority: "high" },
            { title: "Lab Maintenance", content: "Computer lab will be closed on Saturday for maintenance", department: "Computer Science", facultyId: faculty2._id, facultyName: faculty2.name, priority: "medium" },
        ]);

        await StudyMaterial.insertMany([
            { title: "DS Lecture Notes Ch-1 to 5", subject: "Data Structures", description: "Complete notes with examples", facultyId: faculty1._id, facultyName: faculty1.name, fileUrl: "/materials/ds-notes.pdf" },
            { title: "DBMS SQL Cheat Sheet", subject: "Database Systems", description: "Quick reference for SQL commands", facultyId: faculty2._id, facultyName: faculty2.name, fileUrl: "/materials/sql-cheatsheet.pdf" },
            { title: "React Hooks Guide", subject: "Web Development", description: "Complete guide to React hooks", facultyId: faculty2._id, facultyName: faculty2.name, fileUrl: "/materials/react-hooks.pdf" },
        ]);

        await Timetable.insertMany([
            { day: "Monday", time: "09:00-10:00", subject: "Data Structures", department: "Computer Science", year: 3, room: "Lab-1", facultyName: faculty1.name },
            { day: "Monday", time: "10:00-11:00", subject: "Database Systems", department: "Computer Science", year: 3, room: "Room-201", facultyName: faculty2.name },
            { day: "Tuesday", time: "09:00-10:00", subject: "Web Development", department: "Computer Science", year: 3, room: "Lab-2", facultyName: faculty2.name },
            { day: "Wednesday", time: "11:00-12:00", subject: "Algorithms", department: "Computer Science", year: 3, room: "Room-301", facultyName: faculty1.name },
            { day: "Thursday", time: "09:00-10:00", subject: "Data Structures", department: "Computer Science", year: 3, room: "Lab-1", facultyName: faculty1.name },
            { day: "Friday", time: "10:00-11:00", subject: "Database Systems", department: "Computer Science", year: 3, room: "Room-201", facultyName: faculty2.name },
        ]);

        console.log("✅ Database seeded successfully!");
        console.log("📧 Login credentials:");
        console.log("   Student: rahul@student.edu / 123456");
        console.log("   Faculty: rajesh@cse.edu / 123456");
        console.log("   Admin:   admin@edu.com / admin123");
    } catch (error) {
        console.error("❌ Seed error:", error.message);
    }
}

module.exports = seedDatabase;
