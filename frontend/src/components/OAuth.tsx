import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {FcGoogle} from "react-icons/fc";
import {app} from "../../firebase"
import {getAuth} from "firebase/auth";
import toast from "react-hot-toast";
import {loginSuccess} from "@/redux/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Spinner} from "flowbite-react";
import {handleOAuth} from "@/services/auth/login";
const OAuth = () => {
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    provider.setCustomParameters({prompt: "select_account"})
    const auth = getAuth(app);

    async function OAuthLogin() {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const {displayName, email, photoURL} = user;
            if (displayName && email) {
                const response = await handleOAuth({displayName, email, photoURL})
                dispatch(loginSuccess(response))
                toast.success("Login success");
                navigate("/home");

            } else {
                toast.error("Login Failed");
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message)
                toast.error(e.message);
            } else {
                toast.error("Something went wrong");
            }
        }
        finally {
            setLoading(false);

        }
    }

    return (
        <button disabled={loading} type="button" onClick={OAuthLogin} className="w-full bg-black hover:bg-gray-900 active:bg-gray-800">
            <span className="font-semibold flex flex-row gap-2 items-center justify-center py-2 px-10 text-white border border-slate-600" >
                {loading ? (<div className="flex items-center gap-3"><Spinner size="sm" /><span>Loading</span></div>) : (<><FcGoogle /> < span > Google </span ></>)}
            </span>
        </button >
    )
}

export default OAuth;
