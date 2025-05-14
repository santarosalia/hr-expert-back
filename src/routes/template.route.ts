import { Router } from 'express';
import { templateController } from '../controllers/template.controller';

const router = Router();

router.post('/', (req, res) => templateController.createTemplate(req, res));
router.get('/', (req, res) => templateController.getAllTemplates(req, res));
router.get('/:id', (req, res) => templateController.getTemplateById(req, res));

export default router;
