/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { TUser } from "../interface/TUser";
import Loading from "../components/Loading";
import { NavLink, useLocation, useNavigate } from "react-router";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const token = useAppSelector((state) => state.auth.auth)
    const dispatch = useAppDispatch()
    // const navigate = useNavigate()
    type Inputs = {
        email: string;
        password: string;
    };

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<Inputs>();

    const [login] = useLoginMutation()
    console.log({ token });

    useEffect(() => {
        if (token?.token) {
            navigate(from, { replace: true });
            reset();
        }
    }, [token, navigate, from, reset]);
    const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in', { autoClose: 2000 })
        setLoading(true)
        try {
            const res = await login(data)
            console.log(res);
            if (res?.data) {
                const token = (res as any)?.data?.data?.accessToken;
                toast.update(toastId, { render: `${(res as any)?.data?.message}`, type: "success", isLoading: false, autoClose: 2000 })

                // eslint-disable-next-line prefer-const
                let user: TUser = jwtDecode(token);
                console.log({ user });
                const userToken = {
                    user: {
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        role: user.role,
                        branch: user.branch,
                        address: user.address
                    },
                    token
                }
                dispatch(setUser(userToken))
                setLoading(false)
            } else if (res.error) {
                console.log(res.error);
                toast.update(toastId, { render: `${(res.error as any)?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 })
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
            toast.update(toastId, { render: `${(error as any)?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 })
            setLoading(false)
        }


    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-2"
            >

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" className="grow" placeholder="Enter your email" {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })} />
                </label>

                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <label className="input input-bordered flex items-center gap-2" >
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"

                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 5,
                                message: "Password must be at least 5 characters",
                            },
                            pattern: {
                                value: /^[A-Za-z0-9]+$/,
                                message: "Password can only contain letters and numbers",
                            },
                        })}
                    />
                    <button
                        type="button"
                        className="text-sm text-blue-500 underline"
                        onClick={() => setShowPassword(!showPassword)}
                    >

                        {showPassword ? <p className="text-2xl text-black"><IoIosEyeOff /></p> : <p className="text-2xl text-black"><IoIosEye /></p>}
                    </button>
                </label>
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                {
                    loading ? <Loading /> : <input
                        type="submit"
                        className="btn btn-primary"
                    />
                }
                <p>If you have no account <NavLink to='/register' className='font-bold link uppercase'>Register</NavLink></p>
            </form>
        </div>
    );
};

export default Login;