import {Spinner} from "flowbite-react";
import {Label} from "flowbite-react";
import {Button} from "flowbite-react";
import {Formik} from "formik";
import {loginSchema} from "@/utils/validateSchema";
import axios from "@/utils/axios"
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {loginSuccess} from "@/redux/slices/userSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import OAuth from "@/components/OAuth";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const formData = {
        email: "",
        password: "",
    }
    async function handleSubmit(value: typeof formData) {
        setLoading(true);
        toast.dismiss();
        try {
            const response = await axios.post("/auth/login", {
                password: value.password,
                email: value.email.trim()
            })
            dispatch(loginSuccess(response.data));
            toast.success("Login Successfull")
            navigate("/home");

        } catch (e: unknown) {
            console.log(e)
            if (e instanceof AxiosError) {
                if (e.response?.status == 400) {
                    toast.error("All fields are required");
                } else if (e.response?.status == 401) {
                    toast.error(e.response.data.message)
                } else if (e.response?.status == 403) {
                    toast.error(e.response.data.message)
                } else {
                    toast.error(e.response!.data)
                }
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            setLoading(false);
        }


    }
    return (
        <main className="min-h-screen h-full w-full flex justify-center items-center">
            <img src="/bg_poster.jpg" className="object-cover w-full h-full z-0 left-0 top-0 fixed" alt="backgournd poster" />
            <div className="max-w-xl gap-14 md:mx-auto font-clashSemiBold flex flex-col z-10 justify-center w-full dark:bg-black/50 bg-black/50 mx-3 rounded-xl p-10 border border-white/30">
                <span className="flex-1 whitespace-nowrap px-2 py-1 gap-4 flex flex-col  items-center justify-center md:items-start">
                    <span className="text-2xl gap-2 flex flex-row items-center justify-center w-full">
                        <Link to="/" className="flex flex-row items-center gap-3">
                            <img src="/movie.png" alt="Icon" className="w-auto h-16" />
                            <span className="flex flex-col items-start justify-center text-white">
                                <span className="text-nowrap"><span className="text-red-600">Movie</span> Finder</span>
                                <span className="text-sm tracking-wider font-semibold font-clashRegular">Bing read movies</span>
                            </span>
                        </Link>
                    </span>
                </span>
                <Formik initialValues={formData} onSubmit={handleSubmit} validationSchema={loginSchema}>
                    {({handleSubmit, handleChange, errors, touched, values, handleBlur}) => (
                        <form className="flex-1 flex flex-col gap-8" onSubmit={handleSubmit}>
                            <div className="h-[5.5rem]">
                                <Label value="Email" className="text-white text-lg" />
                                <input placeholder="example@gmail.com" type="text" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} className="!bg-gray-800 px-2 py-3 w-full rounded-md text-white" />
                                {touched.email && errors.email ? <span className="text-red-500 text-sm">{errors.email}</span> : null}
                            </div>
                            <div className="h-[6rem]">
                                <Label value="Password" className="text-white text-lg" />
                                <input placeholder="*******" onBlur={handleBlur} value={values.password} type="password" id="password" onChange={handleChange} className="!bg-gray-800 px-2 py-3 w-full rounded-md text-white" />
                                {touched.password && errors.password ? <span className="text-red-500 text-sm">{errors.password}</span> : null}
                            </div>
                            <div className="flex flex-col gap-3 justify-center">
                                <Button className="!bg-red-700 hover:!bg-red-800" type="submit" disabled={loading}>
                                    {!loading ? (<div className="font-semibold text-base ">Login</div>) : <><Spinner size="sm" /><span className="pl-3">Loading...</span></>}
                                </Button>
                                <OAuth />
                                <span className="text-sm text-white">Don&apos;t Have An Account? <Link className="text-red-500" to="/register">Register here</Link></span>

                            </div>
                        </form>

                    )
                    }

                </Formik >
            </div >


        </main >
    )
}

export default Login;
