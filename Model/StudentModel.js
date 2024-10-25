import { DataTypes } from "sequelize";

// Define the Student schema
export const StudentSchema = (sequelize) => {
    const Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Student;
};
