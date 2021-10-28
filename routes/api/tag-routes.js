const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  try{
    const productTagData = await  ProductTag.findAll();
    res.status(200).json(productTagData);
  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  
  try{
    const productTagData = await  ProductTag.findByPk(req.params.id);
    res.status(200).json(productTagData);

    if(!productTagData){
      res.status(404).json({message: 'Tag not found!'});
    }

  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
  const tagData = await Book.update(
    {
      // All the fields you can update and the data attached to the request body.
      name: req.body.name,
    },
    {
      // Gets a tag based on the id given in the request parameters
      where: {
        tag_id: req.params.id,
      },
    }
  );
  res.status(200).json(tagData);
  }
  catch (err){
    console.log(err);
    res.status(500).send(err);
  }


});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      tag_id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;