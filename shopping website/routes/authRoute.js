
import express from "express";
import {registerController,loginController,testController, forgetpasswordConroller, getOrdersController, getAllOrdersController, orderStatusController,} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router =express.Router()
router.post('/register',registerController);

//login
router.post('/login',loginController);

// Forget Password
router.post('/forget-password',forgetpasswordConroller)

//test routes
router.get('/test',requireSignIn,isAdmin,testController)

//protected user routes
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
//admin routes
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;