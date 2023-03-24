
const userModel = require('../Models/userModel')
const bcrypt = require("bcrypt")


// create user register
exports.registerController = async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists"
            });
        }
        //password hashng 
        const hashedpassword = await bcrypt.hash(password, 10)


        // saved new user
        const user = new userModel({ username, email, password: hashedpassword, userType })
        user.save()
        return res.status(201).send({
            success: true,
            message: "user created successfully ",
            user,
        })
        // ...

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in register callback",
            success: false,
            error
        });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: "users data list",
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "erorr while fetching users",
            error,
        });
    }
};
// get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await userModel.find({});
//         return res.status(200).send({
//             userCount: users.length,
//             sucess: true,
//             message: " all users data",
//             users,
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({
//             success: false,
//             message: "Error in getting all users ",
//             error
//         })
//     }
// };




exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation user login
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "please provide email and password"
            })
        }
        //checking user is registered or not
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "this email is not registered "
            })
        }
        //comparing email and password is matching or not 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "invalid user name or password"
            })
        }
        //after validation successfully login
        const { _id, username, userType } = user;
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            user: { _id, username, email, userType },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: " error in callback",
            error
        })
    }
};
