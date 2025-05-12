import { Router } from 'express';
import { createTemplate, getAllTemplates } from '../controllers/template.controller';

const router = Router();

router.post('/', createTemplate);
router.get('/', getAllTemplates);

export default router;
