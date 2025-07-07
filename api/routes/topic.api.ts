import Express from 'express';

import { TopicModel } from '../models/topic.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const items = await TopicModel.find();
  res.send(items);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await TopicModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await TopicModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
