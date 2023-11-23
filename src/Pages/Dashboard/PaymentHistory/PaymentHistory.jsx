import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], isPending } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments/${user.email}`);
            return res.data;
        },
    });
    const total = payments.reduce((sum, payment) => {
        return sum + payment.amount / 100;
    }, 0);

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SectionTitle
                heading="Payment History"
                subheading="---All Payments---"
            ></SectionTitle>
            <div className="px-10 space-y-5">
                <h2 className="text-xl font-bold">
                    Total Payments: {payments.length}
                </h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Total Price</th>
                                <th>Payment Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {payments.map((payment, index) => {
                                return (
                                    <tr key={payment._id}>
                                        <td>{index + 1}</td>
                                        <td>{payment.email}</td>
                                        <td>Food</td>
                                        <td>$ {payment.amount / 100}</td>
                                        <td>
                                            {payment.date
                                                .toString()
                                                .slice(0, 10)}
                                        </td>
                                        <td>
                                            {payment.status === "delivered" ? (
                                                <span className="bg-green-500 p-2 rounded-md text-white">
                                                    {payment.status}
                                                </span>
                                            ) : (
                                                <span className="bg-red-500 p-2 rounded-md text-white">
                                                    {payment.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="text-black text-md font-bold">
                                <th></th>
                                <th></th>
                                <th>Total Payments: </th>
                                <td className="font-bold">
                                    ${total.toFixed(2)}
                                </td>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
