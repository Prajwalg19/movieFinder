import Typo from "@/Typography";
import {BiSolidMessageDetail} from "react-icons/bi";
import {FaPhone} from "react-icons/fa6";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="relative text-base w-full mt-32 bg-slate-50 px-4 lg:px-8 py-8 border-t-2 border-red-700 text-gray-600 dark:bg-gray-900 dark:text-gray-300/90">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start justify-between">
                <section className="flex flex-col items-center lg:items-start gap-5">
                    <div className="font-clashSemiBold flex gap-3 items-center">
                        <img src="/movie.png" alt="icon" className="h-6 w-auto" />
                        <Typo variant="h5"><span className="text-red-700">Movie</span><span> Finder</span></Typo>
                    </div>
                    <div className="font-clashRegular tracking-wider flex items-center gap-3">
                        <BiSolidMessageDetail className="text-xl text-red-700" />
                        <a href="mailto:prajw4l.g@gmail.com">prajw4l.g@gmail.com</a>
                    </div>
                    <div className="font-clashRegular tracking-wider flex items-center gap-3">
                        <FaPhone className="text-xl text-red-700" />
                        <p>+91 7975158795</p>
                    </div>
                </section>

                <Typo variant="body" className="flex flex-col items-center lg:items-start gap-5">
                    <Typo variant="h4" className="text-3xl font-clashSemiBold">Links</Typo>
                    <Link to="/">Home</Link>
                    <a href="https://www.prajwal19.me">About Me</a>
                    <p >Contact</p>
                </Typo>

                <Typo variant="body" className="flex flex-col items-center lg:items-start gap-5">
                    <Typo variant="h4" className="font-clashSemiBold">Legal</Typo>
                    <p>Terms Of Use</p>
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                </Typo>

                <Typo variant="body" className="flex flex-col items-center lg:items-start gap-5 w-full lg:w-auto">
                    <Typo variant="h4" className="font-clashSemiBold">Product</Typo>
                    <p>Take Tour</p>
                    <p>Live Chat</p>
                    <p>Reviews</p>
                </Typo>
            </div>
            <hr className="my-10" />
            <p className="text-center text-gray-600 text-xs dark:text-gray-300/90 font-clashSemiBold tracking-wider">Copyright 2024 Prajwal&copy;, All Rights Reserved</p>

        </footer>
    );
}
