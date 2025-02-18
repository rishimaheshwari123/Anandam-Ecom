const Order = require("../model/order");
const crypto = require("crypto");
const { razorpayInstance } = require("../config/ragorpay");

const createRazorpayOrderCtrl = async (req, res) => {
    try {
        const { amount } = req.body;
        console.log(req.body)
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `order_rcptid_${Math.floor(Math.random() * 100000)}`,
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ orderId: order.id });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in creating order"
        })
    }

}


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
        console.log(req.body)

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !cart || !shippingAddress || !user || !totalPrice) {
            return res.status(400).json({ message: "Missing payment or order details." });
        }

        const secret = process.env.RAZORPAY_SECRET;
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed." });
        }

        // Group cart items by shopId
        const shopItemsMap = new Map();

        for (const item of cart) {
            const shopId = item.shopId;
            if (!shopItemsMap.has(shopId)) {
                shopItemsMap.set(shopId, []);
            }
            shopItemsMap.get(shopId).push(item);
        }

        // Create an order for each shop
        const orders = [];

        for (const [shopId, items] of shopItemsMap) {
            const order = await Order.create({
                cart: items,
                shippingAddress,
                user,
                totalPrice,
                paymentInfo: {
                    id: razorpay_payment_id,
                    status: "Paid",
                    type: "Razorpay",
                },
                status: "Paid",
            });
            orders.push(order);
        }

        return res.status(200).json({ message: "Payment verified and orders placed successfully.", orders });

    } catch (error) {
        console.error("Error in verifyPaymentCtrl:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};




module.exports = { createRazorpayOrderCtrl, verifyPaymentCtrl }
