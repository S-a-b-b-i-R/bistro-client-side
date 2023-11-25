import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// import useMenu from "../../../Hooks/useMenu";
import "./ManageItem.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const ManageItems = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const axiosSecure = useAxiosSecure();
    const {
        data: menu,
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ["menu", itemsPerPage, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `menu?page=${currentPage}&limit=${itemsPerPage}`
            );
            return res.data.menu;
        },
    });

    if (loading) {
        return <h1>Loading...</h1>;
    }
    const numberofPages = Math.ceil(57 / itemsPerPage);
    const pages = [...Array(numberofPages).keys()];
    console.log(menu.length);

    const handleItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextpage = () => {
        setCurrentPage(currentPage + 1);
    };

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
                if (res.status === 200) {
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
                <table className="table table-xs">
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
                                <td>
                                    {index + 1 + currentPage * itemsPerPage}
                                </td>
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
            <div className="pagination">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="bg-[#ff9900] p-2 rounded-sm"
                >
                    Previous
                </button>
                {pages.map((page) => (
                    <button
                        className={
                            currentPage === page
                                ? "selected p-2"
                                : "bg-gray-300 p-2"
                        }
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={handleNextpage}
                    disabled={currentPage === pages[pages.length - 1]}
                    className="bg-[#ff9900] p-2 rounded-sm"
                >
                    Next
                </button>
                <div className="flex items-center">
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        className="w-52"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;
