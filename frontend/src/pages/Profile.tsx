import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {Button, Spinner, TextInput} from "flowbite-react";
import {logOut} from "@/redux/slices/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useState} from "react";
import {logOutClear} from "@/redux/slices/wishlistSlice";
import Typo from "@/Typography";
import {handleDeleteUser} from "@/services/auth/delete";

const Profile = () => {
    const {currentUser} = useSelector((store: RootState) => store.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function deleteUser() {
        setLoading(true)
        try {
            const response = await handleDeleteUser(currentUser?._id as string);
            dispatch(logOut());
            dispatch(logOutClear())
            toast.success(response);
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false)
        }

    }
    return (
        <main className="min-h-screen flex flex-col gap-14 w-full items-center mt-24 p-2">
            <Typo variant="h4" className="font-clashBold text-center">My Profile</Typo>
            <div className="flex justify-center w-full">
                <div className="border-[5px] border-slate-400 w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-full">
                    <img src={`${currentUser?.userPfp}`} className="md:w-32 md:h-32 w-24 h-24 rounded-full" />
                </div>
            </div>

            <Typo variant="p" className="font-clashSemiBold flex flex-col gap-5 max-w-2xl w-full" >
                <TextInput type="text" defaultValue={currentUser?.userName} sizing="lg" placeholder="Username" />
                <TextInput type="email" defaultValue={currentUser?.email} sizing="lg" placeholder="Email" />
                <Button size="lg" outline onClick={() => {dispatch(logOut()); navigate("/login")}}>Sign Out</Button>
                <Button gradientMonochrome="failure" onClick={() => deleteUser()} type="button" outline size="lg" disabled={loading}>
                    {!loading ? (<div>Delete Account</div>) : <><Spinner size="sm" /><span className="pl-3">Deleting...</span></>}
                </Button>

            </Typo >
        </main >
    );
};

export default Profile;
