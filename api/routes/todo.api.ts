import Express from 'express';
import { findTodos, TodoModel } from '../models/todo.model';
const router = Express.Router();
router.get('/', async (req, res) => {
  const items = await findTodos(req.query);
  res.send(items);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await TodoModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await TodoModel.create(req.body);
  res.send({ status: true, result });
});
router.patch('/complete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await TodoModel.findOne({ _id: id });
  if (!!result) {
    result.completed = !result.completed;
    await result.save();
    res.send({ status: true, result });
  } else {
    res.send({ status: false, result: {} });
  }
});
export default router;
