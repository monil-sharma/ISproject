const express = require("express");
const router = express.Router();
const interview = require("../models/interviews");
// const mailSend = require("../mailsend.js");
const User = require("../models/user.js");
const check = require("../middleware/check.js");
const checkUpdates = require("../middleware/checkUpdates.js");

//
router.post("/", check, async (req, res) => {
  try {
    email = [];
    req.body.user.forEach((users) => {
      email.push(users.email);
    });

    //schedule interview
    const newInterview = new interview({
      email: email,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    await newInterview.save();

    // Data of interview added to every user in the interview that is scheduled
    // sending mails to users of new interview
    req.body.user.forEach(async (users) => {
      const USER = await User.findById(users._id);
      // mailSend.sendNotificationMail(
      //   users.email,
      //   users.name,
      //   req.body.startTime,
      //   req.body.endTime
      // );
      USER.interviews.push(newInterview._id);
      await USER.save();
    });

    res.send("Interview successfully created");
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/read", async (req, res) => {
  try {
    const interviews = await interview.find({});
    res.send(interviews);
  } catch (e) {
    res.status(404).send();
  }
});

router.patch("/update", checkUpdates, async (req, res) => {
  try {
    const currInterview = await interview.findById(req.body.interviewId);
    email = [];
    //updateMail to be sent to the members
    req.body.user.forEach((newUser) => {
      email.push(newUser.email);
    });

    //updating the given interview's data
    await interview.findByIdAndUpdate(req.body.interviewId, {
      email,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    const Interview = await interview.findById(req.body.interviewId);

    //updating interviews's list of newly added users
    req.body.user.forEach(async (users) => {
      const USER = await User.findById(users._id);
      if (!USER.interviews.includes(req.body.interviewId)) {
        await USER.interviews.push(req.body.interviewId);
        await USER.save();
      }
      // mailSend.sendUpdateMail(
      //   USER.email,
      //   USER.name,
      //   req.body.startTime,
      //   req.body.endTime
      // );
    });
    // //updating interviews's list of  users' those are removed from the updated interview
    const oldUsersEmail = currInterview.email.filter(
      (emails) => !Interview.email.includes(emails)
    );

    oldUsersEmail.forEach(async (oldEmail) => {
      const oldUser = await User.findOne({ email: oldEmail });
      const index = oldUser.interviews.indexOf(req.body.interviewId);
      if (index > -1) {
        oldUser.interviews.splice(index, 1);
      }
      await oldUser.save();
    });
    res.send("Interview updated Successfully!");
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    //update interviews array of users who are present in interview that is to be deleted
    const interviewId = req.query.id;
    const oldlist = await User.find({});

    for (old of oldlist) {
      const oldUser = await User.findById(old._id);
      var listOfInterviews = [];
      for (interviewOld of oldUser.interviews) {
        if (interviewOld != interviewId) {
          listOfInterviews.push(interviewOld);
        }
      }
      oldUser.interviews = [];
      oldUser.interviews = [...listOfInterviews];
      await oldUser.save();
    }

    //deleting the interview
    await interview.findOneAndDelete({ _id: interviewId });
    res.send("Interview deleted successfully");
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});
router.get("/meeting/:id/:emails", async (req, res) => {
  try {
    const interviewid = req.params.id;
    const emailList = req.params.emails;

    const currInterview = await interview.findById(interviewid);

    for (item of currInterview.email) {
      if (item == emailList) return res.send("interview found");
    }
    return res.send({ error: "email not found" });
  } catch (e) {
    res.status(404).send({ error: "id not found" });
  }
});

module.exports = router;
