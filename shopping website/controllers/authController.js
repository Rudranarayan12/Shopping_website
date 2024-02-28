import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, question } = req.body
        // validation
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone No is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!question) {
            return res.send({ message: "Question is Required" });
        }


        //check User
        const existingUser = await userModel.findOne({ email })
        //existing User
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Alraedy Register please Login"
            })
        }
        // resister User
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, question }).save()

        res.status(201).send({
            success: true,
            message: "user register succesfully",
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in registation",
            error

        })
    }

};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email & password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not register"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRECT, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: "LogIn Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in LogIn",
            error
        })
    }
}

//forget password
export const forgetpasswordConroller = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body
        if (!email) {
            res.status(400).send({
                message: "Email is required"
            })
        }
        if (!question) {
            res.status(400).send({
                message: "Question is required"
            })
        }
        if (!newPassword) {
            res.status(400).send({
                message: "Password is required"
            })
        }
        //check email & question
        const user = await userModel.findOne({ email, question })
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Worng Email & Question"
            })
        }
        const hash = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hash })
        res.status(200).send({
            success: true,
            message: "Password is reset Successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went worng",
            error
        })
    }

}

// testController 
export const testController = (req, res) => {
    res.send("Protected Routes");
}

//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 });  
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};



