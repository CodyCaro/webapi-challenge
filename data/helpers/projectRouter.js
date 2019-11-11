const express = require("express");

const projectModel = require("./projectModel");

const router = express.Router();

router.post("/", validateProject, (req, res) => {
  projectModel.insert(req.body);
  res.status(200).json(req.body);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  res.status(200).json(req.project.actions);
});

router.delete("/:id", validateProjectId, async (req, res) => {
  const project = await projectModel.remove(req.params.id);

  if (project) {
    res.status(200).json({
      message: "project deleted"
    });
  }
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  const project = await projectModel.update(req.params.id, req.body);

  if (project) {
    res.status(200).json({
      message: `Your new project is name: ${req.body.name} description: ${req.body.description}`
    });
  }
});

//custom middleware

async function validateProjectId(req, res, next) {
  try {
    const id = await projectModel.get(req.params.id);
    // console.log(req.params);

    if (id) {
      req.project = id;
      next();
    } else {
      res.status(400).json({ message: "invalid project id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "exception",
      error
    });
  }
}

function validateProject(req, res, next) {
  try {
    if ("name" in req.body && "description" in req.body) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "exception",
      error
    });
  }
}

module.exports = router;
