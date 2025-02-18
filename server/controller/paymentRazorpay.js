const Order = require("../model/order");
const crypto = require("crypto");
const { razorpayInstance } = require("../config/ragorpay");

const createRazorpayOrderCtrl = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `order_rcptid_${Math.floor(Math.random() * 100000)}`,
        };

        const order = await razorpayInstance.orders.create(options);

        // Return the entire order object
        res.status(200).json({ order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating order"
        });
    }
};


const verifyPaymentCtrl = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            cart,
            shippingAddress,
            user,
            totalPrice
        } = req.body;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !cart || !shippingAddress || !user || !totalPrice) {
            return res.status(400).json({ message: "Missing payment or order details." });
        }

        if (!process.env.RAZORPAY_SECRET) {
            console.error("RAZORPAY_SECRET is not set.");
            return res.status(500).json({ message: "Payment configuration error." });
        }

        // Verify Payment Signature
        const secret = process.env.RAZORPAY_SECRET;
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generated_signature = hmac.digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed." });
        }

        // Group cart items by shopId
        const shopOrders = cart.reduce((acc, item) => {
            acc[item.shopId] = acc[item.shopId] || [];
            acc[item.shopId].push(item);
            return acc;
        }, {});

        // Create orders per shop
        const orders = await Promise.all(
            Object.entries(shopOrders).map(async ([shopId, items]) => {
                return await Order.create({
                    cart: items,
                    shippingAddress,
                    user,
                    totalPrice,
                    paymentInfo: {
                        id: razorpay_payment_id,
                        status: "succeeded",
                        type: "Razorpay",
                    },
                });
            })
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified and orders placed successfully.",
            orders
        });

    } catch (error) {
        console.error("Error in verifyPaymentCtrl:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};




module.exports = { createRazorpayOrderCtrl, verifyPaymentCtrl }
