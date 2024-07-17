import {Link} from "react-router-dom";
import {Spinner, TextInput} from "flowbite-react";
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
        <main className="min-h-screen w-full flex justify-center -mt-20 items-center">
            <div className="max-w-4xl w-full p-3 gap-14 md:gap-0 mx-auto flex md:flex-row flex-col md:items-center">
                <span className="flex flex-1 flex-row items-center gap-3 justify-center md:justify-start">
                    <img src="/movie.jpg" alt="Icon" className="w-auto h-16" />
                    <span className="flex flex-col items-start justify-center">
                        <span className="text-sm md:text-md text-wrap block">My Movie Finder</span>
                        <span className="text-xs font-light">Bing read movies</span>
                    </span>
                </span>
                <Formik initialValues={formData} onSubmit={onSubmit} validationSchema={registerSchema}>
                    {({handleSubmit, handleChange, errors, touched, values, handleBlur}) => (
                        <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
                            <div className="h-[5.5rem]">
                                <Label value="User Name" />
                                <TextInput placeholder="User Name" type="text" value={values.userName} id="userName" onBlur={handleBlur} onChange={handleChange} />
                                {touched.userName && errors.userName ? <span className="text-red-500 text-xs">{errors.userName}</span> : null}
                            </div>

                            <div className="h-[5.5rem]">
                                <Label value="Email" />
                                <TextInput placeholder="Email" type="email" id="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
                                {touched.email && errors.email ? <span className="text-red-500 text-xs">{errors.email}</span> : null}
                            </div>
                            <div className="h-[6rem]">
                                <Label value="Password" />
                                <TextInput placeholder="Password" onBlur={handleBlur} value={values.password} type="password" id="password" onChange={handleChange} />
                                {touched.password && errors.password ? <span className="text-red-500 text-xs">{errors.password}</span> : null}
                            </div>
                            <div className="flex flex-col gap-3 justify-center">
                                <Button gradientDuoTone="pinkToOrange" type="submit" disabled={loading}>
                                    {!loading ? (<div className="font-semibold">Register</div>) : <><Spinner size="sm" /><span className="pl-3">Loading...</span></>}
                                </Button>
                                <span className="text-sm">Have an account? <Link className="text-teal-500" to="/login">Login here</Link></span>

                            </div>
                        </form>

                    )}

                </Formik>
            </div>


        </main>
    )
}

export default Register;
