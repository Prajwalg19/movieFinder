import {Carousel} from "flowbite-react";
export default function Drawer() {
    return (
        <div className="h-[430px] m-4">
            <Carousel>
                <img className="object-cover" src="/movie4.jpg" alt="..." />
                <img className="object-cover" src="/movie1.jpg" alt="..." />
                <img className="object-cover" src="/movie2.jpg" alt="..." />
                <img className="object-cover" src="/movie3.jpeg" alt="..." />
                <img className="object-cover" src="/movie5.jpg" alt="..." />
            </Carousel>
        </div>
    );
}
