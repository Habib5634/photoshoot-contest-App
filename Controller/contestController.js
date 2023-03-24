const mongoose = require('mongoose')
const contestModel = require("../Models/contestModel");
const userModel = require("../Models/userModel");

// get all contests
exports.getAllContestController = async (req, res) => {
    try {
        const contest = await contestModel.find({}).populate("user");
        if (!contest) {
            return res.status(200).send({
                success: false,
                message: "No Contest  Found",
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: contest.length,
            message: "All Contest lists",
            contest,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error WHile Getting Contest",
            error,
        });
    }
}

//create contest
exports.createContestController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        //validation 
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const existingUser = await userModel.findById(user)
        //validation
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user"
            })
        }
        const newContest = new contestModel({ title, description, image, user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newContest.save({ session })
        existingUser.contest.push(newContest)
        await existingUser.save({ session })
        await session.commitTransaction()

        return res.status(201).send({
            success: true,
            message: "Contest is created successfully ",
            newContest,
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Error while creating contest',
            error,
        })
    }
}

// update contest
exports.updateContestController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body
        const contest = await contestModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: "Contrest is updated    ",
            contest,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            succes: false,
            message: "error while updating contest ",
            error
        })
    }
}



// Single contest
exports.getContestByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const contest = await contestModel.findById(id);
        if (!contest) {
            return res.status(404).send({
                success: false,
                message: "Contest not found with this id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "fetched single contest successfully",
            contest,
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while getting single Contest",
            error,
        })
    }
}

// Delete contest
exports.deleteContestControler = async (req, res) => {
    try {
        const contest = await contestModel.findByIdAndDelete(req.params.id).populate("user")
        await contest.user.contest.pull(contest)
        await contest.user.save();
        return res.status(200).send({
            success: true,
            message: "Contest dleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "error while deleting contest",
            error,
        })
    }
}


//Get user contest
exports.userContestController = async (req, res) => {
    try {
        const userContest = await userModel.findById(req.params.id).populate("contest")
        if (!userContest) {
            return res.status(404).send({
                success: false,
                message: "contest not found with this id"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Contest",
            userContest
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "error in user contest",
            error
        })
    }

}
//like contest controller
exports.likeContestController = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const contest = await contestModel.findById(id);
        if (!contest) {
            return res.status(404).send({
                success: false,
                message: "Contest not found with this id"
            });
        }
        const likedBy = contest.likedBy || [];
        if (likedBy.includes(email)) {
            return res.status(400).send({
                success: false,
                message: "You have already liked this contest"
            });
        }
        contest.likes += 1;
        contest.likedBy = [...likedBy, email];
        await contest.save();

        return res.status(200).send({
            success: true,
            message: "Contest liked successfully",
            contest,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while liking Contest",
            error,
        });
    }
};

// // Like contest
// exports.likeContestController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const contest = await contestModel.findById(id);
//         if (!contest) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Contest not found with this id"
//             })
//         }
//         contest.likes += 1;
//         await contest.save();

//         return res.status(200).send({
//             success: true,
//             message: "Contest liked successfully",
//             contest,
//         });
//     } catch (error) {
//         console.log(error)
//         return res.status(400).send({
//             success: false,
//             message: "Error while liking Contest",
//             error,
//         })
//     }
// }



///for getting likes 
exports.getLikesController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid contest ID",
            });
        }
        const contest = await contestModel.findById(id);
        if (!contest) {
            return res.status(404).send({
                success: false,
                message: "Contest not found with this ID",
            });
        }
        return res.status(200).send({
            success: true,
            likes: contest.likes,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while fetching likes",
            error: error.message,
        });
    }
};


//for like Button
// exports.likeContestController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const contest = await contestModel.findById(id);

//         if (!contest) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Contest not found with this id',
//             });
//         }

//         // check if the user has already liked the contest
//         const hasLiked = contest.likes.includes(req.user.id);

//         if (hasLiked) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'You have already liked this contest',
//             });
//         }

//         contest.likes.push(req.user.id);
//         const updatedContest = await contestModel.findByIdAndUpdate(id, { likes: contest.likes }, { new: true });

//         return res.status(200).send({
//             success: true,
//             message: 'Contest liked successfully',
//             contest: updatedContest,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).send({
//             success: false,
//             message: 'Error while liking contest',
//             error,
//         });
//     }
// };

//for like button
// const likeContest = async (req, res) => {
//     try {
//         const contest = await Contest.findById(req.params.id)
//         contest.likes += 1
//         const updatedContest = await contest.save()
//         res.status(200).json({ success: true, likes: updatedContest.likes })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ success: false, message: 'Server error' })
//     }
// }

