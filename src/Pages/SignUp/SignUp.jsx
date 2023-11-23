import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        // watch,
        // reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then((result) => {
                updateUserProfile(data.name, data.url)
                    .then(() => {
                        //create user in database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        };
                        axiosPublic
                            .post("/users", userInfo)
                            .then((result) => {
                                if (result.data.acknowledged) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Signed Up!",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    navigate("/login");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    {...register("name", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.name && (
                                    <span className="text-red-700">
                                        Name is required
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Photo URL
                                    </span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="photo url"
                                    name="name"
                                    {...register("url", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.url && (
                                    <span className="text-red-700">
                                        Url is required
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    {...register("email", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.email && (
                                    <span className="text-red-700">
                                        Email is required
                                    </span>
                                    // <p role="alert">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">
                                        Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    {...register("password", {
                                        required: true,
                                        maxLength: 20,
                                        minLength: 6,
                                        pattern:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    })}
                                    className="input input-bordered"
                                />
                                {errors.password?.type === "required" && (
                                    <span className="text-red-700">
                                        Password is required
                                    </span>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <span className="text-red-700">
                                        Password must be at least 6 characters
                                    </span>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <span className="text-red-700">
                                        Password must be less than 20 characters
                                    </span>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <span className="text-red-700">
                                        Password must contain at least one
                                        uppercase letter, one lowercase letter,
                                        one number and one special character
                                    </span>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <div className="px-8 mb-5">
                            <SocialLogin />
                            <p className="text-center">
                                Already have ana ccount?{" "}
                                <Link className="text-blue-400" to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
