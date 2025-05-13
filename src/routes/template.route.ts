import { Router } from 'express';
import {
    createTemplate,
    getAllTemplates,
    getTemplateById,
} from '../controllers/template.controller';

const router = Router();

router.post('/', createTemplate);
router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);

export default router;
