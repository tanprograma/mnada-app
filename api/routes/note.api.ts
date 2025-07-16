import Express from 'express';
import { NoteModel } from '../models/note.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const items = await NoteModel.find();
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
