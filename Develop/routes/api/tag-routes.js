const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product],
  });
  res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product],
  });
  if (!tag) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
  res.json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(updatedRows);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTags = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (deletedTags === 0) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
  }
  res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
