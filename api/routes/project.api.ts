import Express from 'express';
import { findProjects, ProjectModel } from '../models/project.model';
import { dateFilterOptions } from '../utils/date.util';
const router = Express.Router();
router.get('/', async (req, res) => {
  const projects = await findProjects(req.query);
  res.send(projects);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await ProjectModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await ProjectModel.create(req.body);
  res.send({ status: true, result });
});
router.patch('/complete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await ProjectModel.findOne({ _id: id });
  if (!!result) {
    result.completed = !result.completed;
    await result.save();
    res.send({ status: true, result });
  } else {
    res.send({ status: false, result: {} });
  }
});
export default router;
