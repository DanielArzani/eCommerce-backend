const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbTagData) => {
      res.status(200).json({
        status: "success",
        data: {
          tag: dbTagData,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({
          status: "fail",
          message: "No tag found with that ID",
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          tag: dbTagData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => {
      res.status(201).json({
        status: "success",
        data: {
          tag: dbTagData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, { where: { id: req.params.id } })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({
          status: "fail",
          message: "No tag found with that ID",
        });
        return;
      }
      res.status(200).json({
        status: "success",
        data: {
          tag: dbTagData,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({
          status: "fail",
          message: "No tag found with that ID",
        });
        return;
      }
      res.status(204).json({
        status: "success",
        data: {
          tag: null,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        data: {
          message: err,
        },
      });
    });
});

module.exports = router;
