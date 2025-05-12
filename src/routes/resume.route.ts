import { Router } from 'express';
import {
    createResume,
    getResume,
    getResumes,
    updateResume,
    deleteResume,
} from '../controllers/resume.controller';

const router = Router();

router.post('/', createResume);
router.get('/', getResumes);
router.get('/:id', getResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

export default router;
