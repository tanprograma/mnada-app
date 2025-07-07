import Express from 'express';
import { SubjectModel } from '../models/subject.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const items = await SubjectModel.find();
  res.send(items);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await SubjectModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await SubjectModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
