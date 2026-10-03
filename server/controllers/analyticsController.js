const Student = require("../models/Student");
const Mark = require("../models/Mark");
const Attendance = require("../models/Attendance");

const getAnalytics = async (req, res) => {
    try {
        const students = await Student.find();
        const marks = await Mark.find();
        const attendance = await Attendance.find();

        const attendanceTrends = {};
        attendance.forEach((a) => {
            const month = new Date(a.date).toLocaleString("default", { month: "short", year: "numeric" });
            if (!attendanceTrends[month]) attendanceTrends[month] = { present: 0, total: 0 };
            attendanceTrends[month].total++;
            if (a.status === "present") attendanceTrends[month].present++;
        });

        const attendanceTrendData = Object.entries(attendanceTrends).map(([month, data]) => ({
            month,
            percentage: Math.round((data.present / data.total) * 100),
            present: data.present,
            total: data.total,
        }));

        const studentMarks = {};
        marks.forEach((m) => {
            if (!studentMarks[m.studentId]) studentMarks[m.studentId] = { name: m.studentName, total: 0, count: 0 };
            studentMarks[m.studentId].total += (m.marks / m.maxMarks) * 100;
            studentMarks[m.studentId].count++;
        });

        const topPerformers = Object.entries(studentMarks)
            .map(([id, data]) => ({
                studentId: id,
                name: data.name,
                average: Math.round(data.total / data.count),
            }))
            .sort((a, b) => b.average - a.average)
            .slice(0, 10);

        const subjectMarks = {};
        marks.forEach((m) => {
            if (!subjectMarks[m.subject]) subjectMarks[m.subject] = { total: 0, count: 0 };
            subjectMarks[m.subject].total += m.marks;
            subjectMarks[m.subject].count++;
        });

        const subjectWiseAverage = Object.entries(subjectMarks).map(([subject, data]) => ({
            subject,
            average: Math.round(data.total / data.count),
        }));

        let passCount = 0;
        let failCount = 0;
        marks.forEach((m) => {
            if ((m.marks / m.maxMarks) * 100 >= 40) passCount++;
            else failCount++;
        });

        const studentGrowth = {};
        students.forEach((s) => {
            const year = s.createdAt ? new Date(s.createdAt).getFullYear() : 2024;
            studentGrowth[year] = (studentGrowth[year] || 0) + 1;
        });

        const studentGrowthData = Object.entries(studentGrowth)
            .map(([year, count]) => ({ year: Number(year), students: count }))
            .sort((a, b) => a.year - b.year);

        const departmentStats = {};
        students.forEach((s) => {
            departmentStats[s.department] = (departmentStats[s.department] || 0) + 1;
        });

        res.status(200).json({
            success: true,
            data: {
                totalStudents: students.length,
                attendanceTrends: attendanceTrendData,
                topPerformers,
                subjectWiseAverage,
                passFailRatio: { pass: passCount, fail: failCount },
                studentGrowth: studentGrowthData,
                departmentStats: Object.entries(departmentStats).map(([name, count]) => ({ name, count })),
                averageAttendance: students.length
                    ? Math.round(students.reduce((sum, s) => sum + (s.attendancePercentage || 0), 0) / students.length)
                    : 0,
                averageGPA: students.length
                    ? (students.reduce((sum, s) => sum + (s.gpa || 0), 0) / students.length).toFixed(2)
                    : 0,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getFacultyAnalytics = async (req, res) => {
    try {
        const marks = await Mark.find();
        const students = await Student.find();

        const performanceBySubject = {};
        marks.forEach((m) => {
            if (!performanceBySubject[m.subject]) performanceBySubject[m.subject] = [];
            performanceBySubject[m.subject].push({ name: m.studentName, marks: m.marks, maxMarks: m.maxMarks });
        });

        res.status(200).json({
            success: true,
            data: {
                totalStudents: students.length,
                performanceBySubject,
                subjectWiseAverage: Object.entries(
                    marks.reduce((acc, m) => {
                        if (!acc[m.subject]) acc[m.subject] = { total: 0, count: 0 };
                        acc[m.subject].total += m.marks;
                        acc[m.subject].count++;
                        return acc;
                    }, {})
                ).map(([subject, d]) => ({ subject, average: Math.round(d.total / d.count) })),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAnalytics, getFacultyAnalytics };
