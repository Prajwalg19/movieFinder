import {Carousel} from "flowbite-react";
export default function Drawer() {
    return (
        <div className="h-[430px] mx-2">
            <Carousel>
                <img src="/movie1.jpg" alt="..." />
                <img src="/movie2.jpg" alt="..." />
                <img src="/movie3.jpeg" alt="..." />
                <img src="/movie4.jpg" alt="..." />
                <img src="/movie5.jpg" alt="..." />
            </Carousel>
        </div>
    );
}
