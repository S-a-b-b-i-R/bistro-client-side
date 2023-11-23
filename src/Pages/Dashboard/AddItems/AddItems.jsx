import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hositng_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hositng_key}`;
const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        //upload image to imbBB and get the direct link
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        if (res.data.success) {
            //now send the menu item to server with image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            };
            const respons = await axiosSecure.post("/menu", menuItem);
            console.log(respons);
            if (respons.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Item added",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
            }
        }
        console.log(res.data);
    };
    return (
        <div className="px-10 mt-10">
            <SectionTitle heading="Add Items" subheading="---What's New---" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recipe Name</span>
                            </label>
                            <input
                                {...register("name", { required: true })}
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
                                    defaultValue="Select category"
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
                                    type="number"
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
                                className="textarea textarea-bordered h-24"
                                placeholder="Recipe Details"
                            ></textarea>
                        </div>
                        <div className="form-control">
                            <input
                                {...register("image", { required: true })}
                                type="file"
                                className="file-input w-full max-w-xs"
                            />
                        </div>
                        <div>
                            <button className="btn">
                                <FaUtensils />
                                Add Item
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
