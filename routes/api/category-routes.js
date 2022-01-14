const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => {
      // I'm using the JSend specification
      res.status(200).json({
        status: "success",
        data: {
          category: dbCategoryData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: { message: err },
      });
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({
          status: "fail",
          message: "No category found with that ID",
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          category: dbCategoryData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: { message: err },
      });
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => {
      res.status(201).json({
        status: "success",
        data: {
          category: dbCategoryData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: { message: err },
      });
    });
});

router.put("/:id", (req, res) => {
  Category.update(
    { category_name: req.body.category_name },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({
          status: "fail",
          message: "No category found with that ID",
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          category: dbCategoryData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: { message: err },
      });
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({
          status: "fail",
          message: "No category found with that ID",
        });
        return;
      }
      res.status(204).json({
        status: "success",
        data: {
          category: null,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: { message: err },
      });
    });
});

module.exports = router;
