import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import "./Common.css";
// import "./2-Card-Detailed.css";
const CheckoutForm = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [cart, refetch] = useCart();
    const price = cart.reduce((sum, item) => {
        return sum + item.price;
    }, 0);
    const { user } = useAuth();
    // console.log(user);
    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post("create-payment-intent", {
                    price: price,
                })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            // Swal.fire({
            //     icon: "success",
            //     title: "Payment Successful",
            //     showConfirmButton: false,
            //     timer: 1500,
            // });
            setError("");
        }
        //confirm payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        if (confirmError) {
            console.log(confirmError);
            setError(confirmError.message);
            setTransactionId("");
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: confirmError.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            console.log(paymentIntent);
            setError("");
            setLoading(false);
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user.email,
                    name: user.displayName,
                    paymentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    date: new Date(),
                    cartId: cart.map((item) => item._id),
                    menuItemId: cart.map((item) => item.menuId),
                    status: "pending",
                };
                const res = await axiosSecure.post("/payments", payment);
                console.log(res);
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "Payment Successful",
                    text: `Payment ID: ${paymentIntent.id}`,
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/dashboard/paymenthistory");
                    }
                });
            }
        }
    };
    return (
        <div className="w-2/3 mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <div className="flex justify-center">
                    <button
                        className="btn btn-sm btn-primary"
                        type="submit"
                        disabled={!stripe || !clientSecret || loading}
                    >
                        Pay
                    </button>
                </div>
                <p className="text-red-500">{error}</p>
                {transactionId && (
                    <p className="text-green-500">
                        Payment ID: {transactionId}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CheckoutForm;
