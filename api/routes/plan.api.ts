import Express from 'express';
import { findPlans, PlanModel } from '../models/plan.model';
const router = Express.Router();
router.get('/', async (req, res) => {
  const plans = await findPlans(req.query);
  res.send(plans);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await PlanModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await PlanModel.create(req.body);
  res.send({ status: true, result });
});
router.patch('/complete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await PlanModel.findOne({ _id: id });
  if (!!result) {
    result.completed = !result.completed;
    await result.save();
    res.send({ status: true, result });
  } else {
    res.send({ status: false, result: {} });
  }
});
export default router;
