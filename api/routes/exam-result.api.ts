import Express from 'express';
import { ResultsModel } from '../models/exam-result.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const items = await ResultsModel.find();
  res.send(items);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await ResultsModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await ResultsModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
