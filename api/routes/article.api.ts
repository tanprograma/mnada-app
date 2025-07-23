import Express from 'express';
import { ArticleModel } from '../models/article.model';

const router = Express.Router();
router.get('/', async (req, res) => {
  const { limit } = req.query;
  const items = !!limit
    ? await ArticleModel.find()
        .select({ author: 1, title: 1, createdAt: 1 })
        .sort({ createdAt: -1 })
        .limit(parseInt(limit as string))
    : await ArticleModel.find()
        .select({ author: 1, title: 1, createdAt: 1 })
        .sort({ createdAt: -1 });
  res.send(items);
});
router.get('/selected-article/:id', async (req, res) => {
  const { id } = req.params;
  const item = await ArticleModel.findOne({ _id: id });
  res.send(item);
});
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const result = await ArticleModel.findOneAndDelete({ _id: id });
  res.send({ status: true });
});
router.post('/create', async (req, res) => {
  const result = await ArticleModel.create(req.body);
  res.send({ status: true, result });
});

export default router;
