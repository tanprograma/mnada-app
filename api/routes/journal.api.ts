import Express from 'express';
import { findJournals, JournalModel } from '../models/journal.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const projects = await findJournals(req.query);
  res.send(projects);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await JournalModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await JournalModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
