const express = require("express");

const projectModel = require("./projectModel");
const actionModel = require("./actionModel");

const router = express.Router();

router.post("/", validateProject, (req, res) => {
  projectModel.insert(req.body);
  res.status(200).json(req.body);
});

router.post("/:id/actions/", validateProjectId, validateAction, (req, res) => {
  actionModel.insert(req.body);
  res.status(200).json(req.body);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  res.status(200).json(req.project.actions);
});

router.get(
  "/:id/actions/:actionID",
  validateProjectId,
  validateActionId,
  (req, res) => {
    // console.log(req);
    res.status(200).json(req.project.action);
  }
);

router.delete("/:id", validateProjectId, async (req, res) => {
  const project = await projectModel.remove(req.params.id);

  if (project) {
    res.status(200).json({
      message: "project deleted"
    });
  }
});

router.delete(
  "/:id/actions/:actionID",
  validateProjectId,
  validateActionId,
  async (req, res) => {
    const action = await actionsModel.remove(req.params.actionID);

    console.log(action);

    if (action) {
      res.status(200).json({
        message: "project deleted"
      });
    }
  }
);

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

async function validateActionId(req, res, next) {
  try {
    const id = await actionModel.get(req.params.actionID);
    // console.log(req.params);

    if (id) {
      req.project.action = id;
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

function validateAction(req, res, next) {
  try {
    if (
      "notes" in req.body &&
      "description" in req.body &&
      "project_id" in req.body
    ) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "missing required name field and description field" });
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
