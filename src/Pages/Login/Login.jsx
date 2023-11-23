import { useContext, useEffect, useRef, useState } from "react";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const location = useLocation();
    // console.log(location);
    const state = location.state || "/";
    // console.log(state);
    useEffect(() => {
        loadCaptchaEnginge(5);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if (!disabled) {
            login(email, password)
                .then((result) => {
                    Swal.fire({
                        icon: "success",
                        title: "Logged In!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate(state);
                })
                .catch((error) => {
                    // console.log(error);
                });
        }
    };

    const handleValidateCaptcha = (e) => {
        const captcha = e.target.value;
        const result = validateCaptcha(captcha);
        if (result) {
            alert("Captcha valid");
            setDisabled(false);
        } else {
            alert("Captcha not valid");
            setDisabled(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Captcha</span>
                                </label>
                                <LoadCanvasTemplate />
                                <input
                                    ref={captchaRef}
                                    onBlur={handleValidateCaptcha}
                                    type="text"
                                    placeholder="type the letters above here"
                                    name="captcha"
                                    className="input input-bordered"
                                    required
                                />
                                <button className="btn btn-outline btn-xs">
                                    Validate
                                </button>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    disabled={disabled}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="divider"></div>
                        <div className="px-8 mb-5">
                            <SocialLogin />
                            <p className="text-center">
                                New here?{" "}
                                <Link className="text-blue-400" to="/signup">
                                    Create An Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
