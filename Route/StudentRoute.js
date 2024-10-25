import express from "express";
import { CreateStudent, GetAllStudents, GetStudentById, UpdateStudent, DeleteStudent } from "../Controller/StudentController.js";

const router = express.Router();

// Create a new student
router.post("/register", CreateStudent);

// Get all students
router.get("/getAll", GetAllStudents);

// Get a single student by ID
router.get("/profile/:id", GetStudentById);

// Update a student's information
router.put("/update/:id", UpdateStudent);

// Delete a student
router.delete("/delete/:id", DeleteStudent);

export default router;
