import { useParams } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hositng_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hositng_key}`;

const UpdateItem = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();
    const {
        data: item,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["item", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/menu/${id}`);
            console.log(res);
            return res.data.menu;
        },
    });
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    const onSubmit = async (data) => {
        console.log(data);
        //upload image to imbBB and get the direct link
        const imageFile = { image: data.image[0] };
        console.log(imageFile);
        const res =
            imageFile.image !== undefined
                ? await axiosPublic.post(image_hosting_api, imageFile, {
                      headers: {
                          "content-type": "multipart/form-data",
                      },
                  })
                : null;
        if (res?.data.success) {
            //now send the menu item to server with image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res ? res.data.data.display_url : item.image,
            };
            const respons = await axiosSecure.patch(
                `/menu/${item._id}`,
                menuItem
            );
            console.log(respons);
            if (respons.data.menu.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Item added",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
                refetch();
            }
        } else {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: item.image,
            };
            const respons = await axiosSecure.patch(
                `/menu/${item._id}`,
                menuItem
            );
            console.log(respons);
            if (respons.data.menu.modifiedCount) {
                Swal.fire({
                    icon: "success",
                    title: "Item Updated",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
                refetch();
            }
        }
    };
    return (
        <div className="px-10 mt-10">
            <SectionTitle
                heading="Update Item"
                subheading="---Update Info---"
            />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recipe Name</span>
                            </label>
                            <input
                                {...register("name", { required: true })}
                                defaultValue={item.name}
                                type="text"
                                placeholder="Recipe Name"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    {...register("category", {
                                        required: true,
                                    })}
                                    defaultValue={item.category}
                                >
                                    <option disabled>Select category</option>
                                    <option value="salad">Salad</option>
                                    <option value="soup">Soup</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    {...register("price", { required: true })}
                                    defaultValue={item.price}
                                    type="float"
                                    placeholder="Price"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Recipe Details
                                </span>
                            </label>
                            <textarea
                                {...register("recipe", { required: true })}
                                defaultValue={item.recipe}
                                className="textarea textarea-bordered h-24"
                                placeholder="Recipe Details"
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <input
                                {...register("image")}
                                type="file"
                                className="file-input w-full max-w-xs"
                            />
                        </div>
                        <div>
                            <button className="btn">
                                <FaUtensils />
                                Update Item
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
