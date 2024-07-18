import {Link} from "react-router-dom";
import {Spinner} from "flowbite-react";
import {Label} from "flowbite-react";
import {Button} from "flowbite-react";
import {Formik} from "formik";
import axios from "@/utils/axios"
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {registerSchema} from "../utils/validateSchema"
const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formData = {
        email: "",
        password: "",
        userName: "",
    }
    async function onSubmit(value: typeof formData) {
        setLoading(true);
        try {
            await axios.post("/auth/register", {
                email: value.email.trim(),
                password: value.password,
                userName: value.userName
            })
            navigate("/login");
            toast.success("User created successfully")
            setLoading(false);

        } catch (e: unknown) {
            console.log(e)
            if (e instanceof AxiosError) {
                if (e.response?.status == 400) {
                    toast.error("All fields are required");
                } else if (e.response?.status == 409) {
                    toast.error(e.response.data.message)
                }
            } else {
                toast.error("Something went wrong")
            }

            setLoading(false);
        }


    }
    return (
        <main className="min-h-screen h-full w-full flex justify-center -mt-20 items-center font-clashSemiBold">
            <img src="/bg_poster.jpg" className="object-cover w-full h-full -z-10 left-0 top-0 fixed " alt="backgournd poster" />
            <div className="max-w-xl gap-14 md:mx-auto flex flex-col justify-center w-full bg-black/50 mx-3 rounded-xl p-10 border border-white/30">
                <span className="flex-1 whitespace-nowrap px-2 py-1 gap-4 flex flex-col items-center justify-center md:items-start">
                    <span className="text-2xl gap-2 flex flex-row items-center justify-center w-full">
                        <span className="flex flex-row items-center gap-3">
                            <img src="/movie.png" alt="Icon" className="w-auto h-16" />
                            <span className="flex flex-col items-start justify-center text-white">
                                <span className="text-nowrap"><span className="text-red-600">Movie</span> Finder</span>
                                <span className="text-sm tracking-wider font-semibold font-clashRegular">Bing read movies</span>
                            </span>
                        </span>
                    </span>
                </span>
                <Formik initialValues={formData} onSubmit={onSubmit} validationSchema={registerSchema}>
                    {({handleSubmit, handleChange, errors, touched, values, handleBlur}) => (
                        <form className="flex-1 flex flex-col gap-3" onSubmit={handleSubmit}>
                            <div className="h-[5.5rem]">
                                <Label value="User Name" className="text-lg text-white" />
                                <input placeholder="User Name" type="text" value={values.userName} id="userName" onBlur={handleBlur} onChange={handleChange} className="!bg-gray-800 px-2 py-3 w-full rounded-md text-white" />
                                {touched.userName && errors.userName ? <span className="text-red-500 text-xs">{errors.userName}</span> : null}
                            </div>

                            <div className="h-[5.5rem]">
                                <Label value="Email" className="text-lg text-white" />
                                <input placeholder="example@gmail.com" type="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} className="!bg-gray-800 px-2 py-3 w-full rounded-md text-white" />
                                {touched.email && errors.email ? <span className="text-red-500 text-xs">{errors.email}</span> : null}
                            </div>
                            <div className="h-[6rem]">
                                <Label value="Password" className="text-lg text-white" />
                                <input placeholder="********" onBlur={handleBlur} value={values.password} type="password" id="password" onChange={handleChange} className="!bg-gray-800 px-2 py-3 w-full rounded-md text-white" />
                                {touched.password && errors.password ? <span className="text-red-500 text-xs">{errors.password}</span> : null}
                            </div>
                            <div className="flex flex-col gap-3 justify-center">
                                <Button className="!bg-red-700 hover:!bg-red-800" type="submit" disabled={loading}>
                                    {!loading ? (<div className="font-semibold">Register</div>) : <><Spinner size="sm" /><span className="pl-3">Loading...</span></>}
                                </Button>
                                <span className="text-sm text-white">Have an account? <Link className="text-red-600" to="/login">Login here</Link></span>

                            </div>
                        </form>

                    )}

                </Formik>
            </div >


        </main >
    )

}

export default Register;
