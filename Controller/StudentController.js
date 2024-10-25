import { StudentSchema } from "../Model/StudentModel.js";
import { MarksSchema } from "../Model/MarksModel.js";
import sequelize from "../postgres/database.js";

const Student = StudentSchema(sequelize);
const Marks = MarksSchema(sequelize);

// create a new Student
export const CreateStudent = async (req, res, next) => {
    const { name, email, age, parentId } = req.body;
    try {
        const newStudent = await Student.create({ name, email, age, parentId });
        res.status(201).json({
            message: "Student created successfully",
            newStudent
        });
    } catch (err) {
        next(err);
    }
};

//  pagination code
export const GetAllStudents = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Student.findAndCountAll({
            limit: limit,
            offset: offset,
        });

        res.status(200).json({
            totalCount: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            students: rows,
        });
    } catch (err) {
        next(err);
    }
};


// fetch student by id
export const GetStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update studnet information
export const UpdateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, age, parentId } = req.body;

    const updatedFields = {};

    if (name) updatedFields.name = name; 
    if (email) updatedFields.email = email;
    if (age !== undefined && age !== "") updatedFields.age = age;
    if (parentId) updatedFields.parentId = parentId; 

    try {
        const [updated] = await Student.update(updatedFields, {
            where: { id }
        });
        if (!updated) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a student
export const DeleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        // while deleting a student first we have to delte marks
        const deleteMarksFirst = await Marks.destroy({
            where: { studentId: id },
        });
        if (deleteMarksFirst === 0) {
            return res.status(404).json({ message: "First give marks to delte" });
        }

        const deleteStudent = await Student.destroy({ where: { id } })

        // Check if the student was found and deleted
        if (deleteStudent === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(204).json({ message: "Student deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};