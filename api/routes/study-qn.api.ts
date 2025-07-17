import Express from 'express';
import { StudyModel } from '../models/study-qn.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  let options: { [key: string]: any } = {};
  for (let item of Object.keys(req.query)) {
    if (item !== 'limit') {
      options[item] = req.query[item];
    }
  }
  let { limit } = req.query;
  const items = !!limit
    ? await StudyModel.find(options).limit(parseInt(limit as string))
    : await StudyModel.find(options);
  res.send(items);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await StudyModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await StudyModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
