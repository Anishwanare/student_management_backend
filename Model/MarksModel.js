import { DataTypes } from 'sequelize';

export const MarksSchema = (sequelize) => {
    const Marks = sequelize.define('Marks', {
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Students',
                key: 'id',
                onDelete: 'CASCADE' // This enables cascading delete
            }
        },
        marks: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    return Marks;
};
