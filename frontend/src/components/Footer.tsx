import {BiSolidMessageDetail} from "react-icons/bi";
import {FaPhone} from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="text-base w-full mt-32 bg-slate-50 px-4 lg:px-8 py-8 border-t-2 border-red-700 text-gray-600 dark:bg-black dark:text-gray-300/90">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start justify-between">
                <section className="flex flex-col items-center lg:items-start gap-5">
                    <div className="font-clashSemiBold flex gap-3 items-center">
                        <img src="/movie.png" alt="icon" className="h-6 w-auto" />
                        <p><span className="text-red-700">Movie</span><span> Finder</span></p>
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

                <section className="font-clashRegular tracking-wider flex flex-col items-center lg:items-start gap-5">
                    <p className="text-3xl font-clashSemiBold">Links</p>
                    <p>Home</p>
                    <p>About Us</p>
                    <p>Contacts</p>
                </section>

                <section className="font-clashRegular tracking-wider flex flex-col items-center lg:items-start gap-5">
                    <p className="text-3xl font-clashSemiBold">Legal</p>
                    <p>Terms Of Use</p>
                    <p>Privacy Policy</p>
                    <p>Cookie Policy</p>
                </section>

                <section className="flex flex-col items-center font-clashRegular tracking-wider lg:items-start gap-5">
                    <p className="text-3xl font-clashSemiBold">Product</p>
                    <p>Take Tour</p>
                    <p>Live Chat</p>
                    <p>Reviews</p>
                </section>

                <section className="flex flex-col items-center font-clashRegular tracking-wider lg:items-start gap-5 w-full lg:w-auto">
                    <p className="text-3xl font-clashSemiBold">Newsletter</p>
                    <p>Stay Up To Date</p>
                    <div className="flex flex-col lg:flex-row gap-3 w-full">
                        <input
                            type="text"
                            placeholder="Your email"
                            className="border border-gray-200 py-2 px-3 w-full lg:w-auto flex-grow text-black"
                        />
                        <button className="py-2 px-6 bg-black rounded-sm text-white text-base border dark:border-gray-300/40">Subscribe</button>
                    </div>
                </section>
            </div>
            <hr className="my-10" />
            <p className="text-center text-gray-600 text-xs dark:text-gray-300/90 font-clashSemiBold tracking-wider">Copyright 2024 Prajwal&copy;, All Rights Reserved</p>

        </footer>
    );
}
