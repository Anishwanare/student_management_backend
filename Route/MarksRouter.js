import express from 'express';
import {
    CreateMarks,
    GetMarksByStudent,
    // UpdateMarks,
    // DeleteMarks
} from '../Controller/MarksController.js';

const router = express.Router();

router.post('/create', CreateMarks);
router.get('/marks/student/:id', GetMarksByStudent);
// router.put('/update/:id', UpdateMarks);
// router.delete('/marks/:id', DeleteMarks);

export default router;
