import {Spinner} from "flowbite-react";
import {Label} from "flowbite-react";
import {Button} from "flowbite-react";
import {Formik} from "formik";
import {loginSchema} from "@/utils/validateSchema";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {loginSuccess} from "@/redux/slices/userSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import OAuth from "@/components/OAuth";
import {handleLogin} from "@/services/auth/login";
import {BsFillEyeFill} from "react-icons/bs";
import {BsEyeSlashFill} from "react-icons/bs";
import Typo from "@/Typography";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const formData = {
        email: "",
        password: "",
    }
    async function handleSubmit(value: typeof formData) {
        setLoading(true);
        toast.dismiss();
        try {
            const response = await handleLogin(value);
            dispatch(loginSuccess(response));
            toast.success("Login Successfull")
            navigate("/home");
        } catch (e: unknown) {
            console.log(e)
            if (e instanceof Error) {
                toast.error(e.message);
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
                    <span className="gap-2 flex flex-row items-center justify-center w-full">
                        <Link to="/" className="flex flex-row items-center gap-3">
                            <img src="/movie.png" alt="Icon" className="w-auto h-16" />
                            <span className="flex flex-col items-start justify-center text-white">
                                <Typo variant="h6" className="text-nowrap"><span className="text-red-599">Movie</span> Finder</Typo>
                                <Typo variant="body">Bing read movies</Typo>
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
                                <div className="relative w-full h-full">
                                    <input placeholder="*******" onBlur={handleBlur} value={values.password} type={visible ? "text" : 'password'} id="password" onChange={handleChange} className="!bg-gray-800 px-2 py-3 w-full rounded-md text-white" />
                                    {visible ? <BsEyeSlashFill className="cursor-pointer absolute right-4 top-4" onClick={() => setVisible(!visible)} /> : <BsFillEyeFill className="absolute right-4 top-4 cursor-pointer" onClick={() => setVisible(!visible)} />}
                                    {touched.password && errors.password ? <span className="text-red-500 text-sm">{errors.password}</span> : null}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 justify-center">
                                <Button className="!bg-red-700 hover:!bg-red-800" type="submit" disabled={loading}>
                                    {!loading ? (<div className="font-semibold text-base ">Login</div>) : <><Spinner size="sm" /><span className="pl-3">Loading...</span></>}
                                </Button>
                                <OAuth />
                                <Typo variant="body-small" className="text-white">Don&apos;t Have An Account? <Link className="text-red-500" to="/register">Register here</Link></Typo>

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
