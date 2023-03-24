const express = require("express");
const {
    getAllContestController,
    createContestController,
    updateContestController,
    getContestByIdController,
    deleteContestControler,
    userContestController,
    likeContestController,
    unlikeContestController,
    getLikesController,
} = require("../Controller/contestController");

const router = express.Router();

router.get("/all-contest", getAllContestController);
router.post("/create-contest", createContestController);
router.put("/update-contest/:id", updateContestController);
router.get("/get-contest/:id", getContestByIdController);
router.delete("/delete-contest/:id", deleteContestControler);
router.get("/user-contest/:id", userContestController);
router.post("/like-contest/:id", likeContestController);

router.get("/:id", getLikesController);

module.exports = router;




// const express = require("express");
// const { getAllContestController,
// createContestController,
// updateContestController,
// getContestByIdController,
// deleteContestControler,
// userContestController,
// likeContest } = require("../Controller/contestController");

// //router ibject
// const router = express.Router()

// //routes

// //GET || all contest
// router.get('/all-contest', getAllContestController)

// //POST || create contest
// router.post('/create-contest', createContestController)


// //PUT ||update Contest
// router.put('/update-contest/:id', updateContestController)

// //GET || Sibgle contest detailes
// router.get('/get-contest/:id', getContestByIdController)



// //DELETE || delete contest
// router.delete('/delete-contest/:id', deleteContestControler)

// //GET || user contest
// router.get('/user-contest/:id', userContestController)



// module.exports = router

