import {Carousel} from "flowbite-react";

export default function Component() {
    return (
        <div className="h-56 sm:h-[400px] xl:h-[400px] 2xl:h-[500px] !rounded-none">
            <Carousel>
                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
            </Carousel>
        </div>
    );
}

