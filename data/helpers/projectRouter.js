const express = require("express");

const projectModel = require("./projectModel");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

// router.get("/", async (req, res) => {
//   try {
//     console.log("get the projects");
//     const projects = await projectModel.get();

//     if (projects) {
//       res.status(200).json(projects);
//     } else {
//       res.status(400).json({
//         message: "There are no projects"
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: "The projects information could not be retrieved."
//     });
//   }
// });

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

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

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
