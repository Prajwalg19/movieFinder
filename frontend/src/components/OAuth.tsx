import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {FcGoogle} from "react-icons/fc";
import {app} from "../../firebase"
import {getAuth} from "firebase/auth";
import toast from "react-hot-toast";
import {loginSuccess} from "@/redux/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "@/utils/axios"
import {AxiosError} from "axios";
import {useState} from "react";
const OAuth = () => {
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    provider.setCustomParameters({prompt: "select_account"})
    const auth = getAuth(app);

    async function handleOAuth() {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const {displayName, email, photoURL} = user;
            const response = await axios.post("/auth/oauth", {displayName, email, photoURL})
            dispatch(loginSuccess(response.data));
            setLoading(false);
            toast.success("Login success");
            navigate("/home");
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                toast.error(e.response.data)
            } else {
                toast.error("Something went wrong");
            }
        }
        finally {
            setLoading(false);

        }


    }

    return (
        <button disabled={loading} type="button" onClick={handleOAuth} className="w-full bg-black hover:bg-gray-900 active:bg-gray-800">
            <span className="font-semibold flex flex-row gap-2 items-center justify-center py-2 px-10 text-white border border-slate-600" >
                <FcGoogle />
                < span > Google </span >
            </span>
        </button >
    )
}

export default OAuth;
