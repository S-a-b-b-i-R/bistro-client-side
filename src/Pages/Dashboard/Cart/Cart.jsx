import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import { RiDeleteBin5Line } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const total = cart
        .reduce((sum, item) => {
            return sum + item.price;
        }, 0)
        .toFixed(2);
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this item from cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`).then((res) => {
                    console.log(res);
                    if (res.data.deletedCount) {
                        Swal.fire({
                            icon: "success",
                            title: "Item deleted from cart",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };
    return (
        <div className="px-32 space-y-12">
            <SectionTitle heading="Cart" subheading="---My Cart---" />
            <div className="flex justify-between items-center">
                <h2 className="text-3xl">Items: {cart.length}</h2>
                <h2 className="text-3xl">Total Price: ${total}</h2>
                <Link
                    to="/dashboard/payment"
                    disabled={!cart.length}
                    className="btn text-xl"
                >
                    Pay
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr className="bg-orange-400">
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item._id}>
                                <th>
                                    <p>{cart.indexOf(item) + 1}</p>
                                </th>
                                <td>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td>
                                    <p>{item.name}</p>
                                </td>
                                <td>
                                    <p>${item.price}</p>
                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost text-xl text-red-800"
                                    >
                                        <RiDeleteBin5Line />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
