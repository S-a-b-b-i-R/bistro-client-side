import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleUpdateUser = (id) => {
        Swal.fire({
            title: "Are you sure to make this user admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`).then((res) => {
                    console.log(res);
                    if (res.data.modifiedCount) {
                        Swal.fire({
                            icon: "success",
                            title: "User updated",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                });
            }
        });
    };

    const handleDeleteUser = (id) => {
        console.log("delete user", id);
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`).then((res) => {
                    console.log(res);
                    if (res.data.deletedCount) {
                        Swal.fire({
                            icon: "success",
                            title: "User deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                });
            }
        });
    };

    return (
        <div>
            <div className="flex flex-row justify-center items-center gap-4 my-4">
                <h2 className="text-2xl">All Users: </h2>
                <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{users.indexOf(user) + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "admin" ? (
                                        <>Admin</>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdateUser(user._id)
                                                }
                                                className="btn bg-transparent border-black"
                                            >
                                                <GrUpdate />
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDeleteUser(user._id)
                                        }
                                        className="btn bg-transparent border-black"
                                    >
                                        <RiDeleteBinLine />
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

export default AllUsers;
