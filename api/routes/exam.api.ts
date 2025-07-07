import Express from 'express';
import { ExamModel } from '../models/exam.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const items = await ExamModel.find();
  res.send(items);
});
router.get('/selected-exam/:id', async (req, res) => {
  const { id } = req.params;
  const item = await ExamModel.findOne({ _id: id });
  res.send(item);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await ExamModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await ExamModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
