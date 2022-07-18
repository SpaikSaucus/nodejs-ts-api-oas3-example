import express from 'express';
import controller from '../controllers/operations';
const router = express.Router();

router.get('/operations', controller.getOperations);
router.get('/operations/:id', controller.getOperation);
router.put('/operations/:id', controller.updateOperation);
router.delete('/operations/:id', controller.deleteOperation);
router.post('/operations', controller.addOperation);

export = router;
