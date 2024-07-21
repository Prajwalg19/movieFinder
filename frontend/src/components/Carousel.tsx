import {Pagination, A11y, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Drawer() {
    return (
        <Swiper
            modules={[Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{clickable: true}}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            className='h-[450px] mx-1'
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            fadeEffect={
                {
                    crossFade: true
                }
            }
        >
            <SwiperSlide className="flex justify-center items-center">
                <img className="object-cover w-full h-full rounded-lg shadow-md" src="/movie4.jpg" alt="Movie 4" />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
                <img className="object-cover w-full h-full rounded-lg shadow-md" src="/movie1.jpg" alt="Movie 1" />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
                <img className="object-cover w-full h-full rounded-lg shadow-md" src="/movie2.jpg" alt="Movie 2" />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
                <img className="object-cover w-full h-full rounded-lg shadow-md" src="/movie3.jpeg" alt="Movie 3" />
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center">
                <img className="object-cover w-full h-full rounded-lg shadow-md" src="/movie5.jpg" alt="Movie 3" />
            </SwiperSlide>
        </Swiper >
    );
};
