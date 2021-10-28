const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  try{
    const categoryData = await  Category.findAll();
    res.status(200).json(categoryData);
  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/:id', (req, res) => {
  
  try{
    const categoryData = await  Category.findByPK(req.params.id, {
      // be sure to include its associated Products
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);

    if(!categoryData){
      res.status(404).json({message: 'Category not found!'});
    }

  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch (err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
 
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
  
});

module.exports = router;
