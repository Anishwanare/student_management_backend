import { Sequelize } from "sequelize";
import { StudentSchema } from "../Model/StudentModel.js"; // Assuming this is the correct path
import { MarksSchema } from "../Model/MarksModel.js";

const sequelize = new Sequelize('StudentData', 'postgres', '3117219172', {
    host: 'localhost',
    dialect: 'postgres'
});

let Students = null;
let Marks = null;

export const connection = async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        Students = await StudentSchema(sequelize);
        Marks = await MarksSchema(sequelize)
        await sequelize.sync();
        // console.log('StudentModel has been created successfully', Students); 
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default sequelize;
