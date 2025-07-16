import Express from 'express';
import { NoteModel } from '../models/note.model';

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
    ? await NoteModel.find(options).limit(parseInt(limit as string))
    : await NoteModel.find(options);
  res.send(items);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await NoteModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await NoteModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
