import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
const FoodCard = ({ item }) => {
    const navigate = useNavigate();
    const { name, recipe, image, price } = item;
    const { user } = useAuth();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const handleAddToCart = (item) => {
        if (user && user.email) {
            const cartItem = {
                menuId: item._id,
                email: user.email,
                name: item.name,
                price: item.price,
                image: item.image,
            };
            axiosSecure
                .post("/carts", cartItem)
                .then((res) => {
                    // console.log(res);
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Item added to cart",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Swal.fire({
                title: "Please Login",
                text: "You need to login to add this item to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Login",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt={name} />
            </figure>
            <p className="absolute right-5 top-5 p-2 rounded-md bg-slate-900 text-white">
                ${price}
            </p>
            <div className="card-body">
                <h2 className="text-2xl font-semibold text-center">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-ghost btn-primary"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    item: PropTypes.object,
};

export default FoodCard;
