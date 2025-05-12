import { Router } from 'express';
import { createField, getFields } from '../controllers/field.controller';

const router = Router();

router.post('/', createField);
router.get('/', getFields);

export default router;