import { Router } from 'express';
import { FieldController } from '../controllers/field.controller';

const router = Router();
const fieldController = new FieldController();

router.post('/', (req, res) => fieldController.createField(req, res));
router.get('/', (req, res) => fieldController.getFields(req, res));

export default router;
