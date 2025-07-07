import Express from 'express';
import { BookModel } from '../models/book.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const items = await BookModel.find();
  res.send(items);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await BookModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await BookModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
