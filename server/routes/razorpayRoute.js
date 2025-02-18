const express = require("express")
const { createRazorpayOrderCtrl, verifyPaymentCtrl } = require("../controller/paymentRazorpay")
const router = express.Router()







router.post("/capturePayment", createRazorpayOrderCtrl)
router.post("/verifyPayment", verifyPaymentCtrl)



module.exports = router