import { MarksSchema } from "../Model/MarksModel.js"
import sequelize from "../postgres/database.js";

const Marks = MarksSchema(sequelize);

export const CreateMarks = async (req, res, next) => {
    // console.log('====================================');
    // console.log(req.body);
    // console.log('====================================');
    const { studentId, marks } = req.body;
    try {
        const createMarks = await Marks.create({ studentId, marks });
        res.status(201).json({
            message: "Marks created successfully",
            createMarks
        });
    } catch (err) {
        next(err);
    }
};


// get marks function
export const GetMarksByStudent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const marks = await Marks.findAll({ where: { studentId: id } });
        res.status(200).json(marks);
    } catch (err) {
        next(err);
    }
};



// // update marks function
// export const UpdateMarks = async (req, res, next) => {
//     const { id } = req.params;
//     const { marks } = req.body;
//     try {
//         const [updated] = await Marks.update({ marks }, { where: { id } });
//         if (!updated) {
//             return res.status(404).json({ message: "Marks not found" });
//         }
//         res.status(200).json({ message: "Marks updated successfully" });
//     } catch (err) {
//         next(err);
//     }
// };


// //  delete marks function
// export const DeleteMarks = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const deleted = await Marks.destroy({ where: { id } });
//         if (!deleted) {
//             return res.status(404).json({ message: "Marks not found" });
//         }
//         res.status(204).send();
//     } catch (err) {
//         next(err);
//     }
// };
