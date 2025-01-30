import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { TRES } from "../interface/apiResponse";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    type Inputs = {
        branch: string;
        code: string;
        address: string;
        name: string;
        email: string;
        password: string;
        phone: string;
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const [registerUser] = useRegisterMutation();

    const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
        console.log({ data })

        const res = await registerUser(data) as unknown as TRES;

        if (res?.data) {
            toast.success('User Registered', {
                autoClose: 2000
            })
            reset()
            navigate('/login')

        }
        if (res?.error) {
            toast.error(`${res?.error?.data?.message}`)
        }
        console.log(res);
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-2"
            >

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-70" viewBox="0 0 300 300" xmlSpace="preserve"><path d="m194.839 115.958 1.576.678a5.164 5.164 0 0 0 2.044.423 5.184 5.184 0 0 0 4.76-3.134 5.18 5.18 0 0 0-2.712-6.802l-1.578-.678a5.179 5.179 0 0 0-6.802 2.711 5.18 5.18 0 0 0 2.712 6.802z" /><path d="M240.331 157.468v-29.814a5.179 5.179 0 0 0-5.178-5.177h-88.727a5.177 5.177 0 1 0 0 10.356h63.576l-63.576 27.333-75.619-32.512 75.619-32.509 33.941 14.592a5.178 5.178 0 0 0 4.09-9.513L148.47 84.751a5.18 5.18 0 0 0-4.09 0l-88.729 38.146a5.18 5.18 0 0 0 0 9.514l88.729 38.146a5.202 5.202 0 0 0 4.09 0l48.833-20.996v35.826c-28.496 26.367-73.263 26.367-101.761 0l.002-9.137a5.177 5.177 0 1 0-10.354-.002l-.002 11.357c0 1.393.561 2.725 1.555 3.699 16.03 15.711 37.225 24.363 59.682 24.363 22.455 0 43.65-8.652 59.681-24.363a5.178 5.178 0 0 0 1.554-3.698l-.002-42.497 22.318-9.595v21.952c-4.219 1.961-7.15 6.236-7.15 11.186 0 5.078 3.79 18.441 12.327 18.441 8.538 0 12.328-13.363 12.328-18.441 0-4.948-2.932-9.223-7.15-11.184zm-5.178 17.872c-1.007-1.976-1.973-5.029-1.973-6.687 0-1.088.884-1.974 1.973-1.974 1.088 0 1.972.886 1.972 1.974 0 1.658-.966 4.712-1.972 6.687z" /><path d="M90.369 165.68a5.176 5.176 0 0 0 5.176-5.177v-1.724a5.177 5.177 0 1 0-10.354 0v1.724a5.177 5.177 0 0 0 5.178 5.177z" /></svg>
                    <input
                        placeholder="Branch Name"
                        {...register("branch", {
                            required: "Branch name is required",
                            pattern: {
                                value: /^[A-Z0-9\s!@#$%^&*()_+={}[\]:;"'<>,.?/-]+$/,
                                message: "Only uppercase letters, numbers, and symbols are allowed",
                            },
                        })}
                    />
                </label>
                {errors.branch && (
                    <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
                )}


                <label className="input input-bordered flex items-center gap-2">
                    <input placeholder="Branch code" {...register("code", {
                        required: "Branch code is required",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Only numbers are allowed",
                        },
                    })}
                    />
                </label>
                {errors.code && (
                    <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
                )}

                <label className="input input-bordered flex items-center gap-2">
                    <input placeholder="Address" {...register("address", {
                        required: "address is required",

                    })}
                    />
                </label>
                {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}

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
                    <input type="email" className="grow" placeholder="Email" {...register("email", {
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

                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input placeholder="Name" {...register("name", {
                        required: "Name is required",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Only letter",
                        },
                    })}
                    />

                </label>
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                <input
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9]{11}$/,
                            message: "Please enter a valid 11-digit phone number",
                        },
                    })}
                    type="text"
                    placeholder="১১ ডিজিটের নাম্বারটি লিখুন"
                    className={`input input-bordered input-md w-full max-w-xs ${errors.phone ? "border-red-500" : ""
                        }`}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}

                <input
                    type="submit"
                    className="btn btn-primary"
                />
                <p>Already have account, so please <NavLink to='/login' className='font-bold link uppercase'>Login</NavLink></p>
            </form>
        </div>
    );
};

export default Register;