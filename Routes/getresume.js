const express = require("express");
const router = express.Router();
const ResumeList = require("../models/ResumeList");
router.post("/saveResume", async (req, res) => {
  let data = req.body.resumeDetails;
  let user_id = await ResumeList.findOne({ email: req.body.email });
  if (user_id) {
    try {
      await ResumeList.findOneAndUpdate(
        {
          email: req.body.email,
        },
        {
          $push: { resumeList: data },
        }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await ResumeList.create({
        email: req.body.email,
        resumeList: [data],
      }).then(() => {
        res.status(200).json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).send("Server Error", error.message);
    }
  }
});

router.post("/getResumeList", async (req, res) => {
  try {
    let id = await ResumeList.findOne({ email: req.body.email });
    if (!id) {
      return res.json({ resumeList: [] });
    }
    res.json({ resumeList: id.resumeList });
  } catch (error) {
    console.log(error.message);
    res.send("Error", error.message);
  }
});

router.post("/deleteResume", async (req, res) => {
  try {
    let response = await ResumeList.findOneAndUpdate(
      { email: req.body.email },
      { resumeList: req.body.resumeList }
    );
    if (!response) {
      return res.status(400).json({ success: true });
    }
    res.status(200).json({ sucess: true });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error", error.message);
  }
});

module.exports = router;
