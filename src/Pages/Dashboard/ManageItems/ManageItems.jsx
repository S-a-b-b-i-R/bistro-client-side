import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    if (loading) {
        return <h1>Loading...</h1>;
    }
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Item deleted",
                        timer: 1500,
                    });
                }
                refetch();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your item is safe :)", "error");
            }
        });
    };
    return (
        <div className="px-10 mt-10">
            <SectionTitle heading="Manage Items" subheading="---Hurry Up---" />

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={item.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/updateitems/${item._id}`}
                                        className="btn btn-ghost btn-xs text-xl text-yellow-600"
                                    >
                                        <FaEdit />
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteItem(item)}
                                        className="btn btn-ghost btn-xs text-xl text-red-600"
                                    >
                                        <RiDeleteBin5Line />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;
