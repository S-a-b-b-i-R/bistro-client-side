import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import img1 from "../../assets/home/slide1.jpg";
import img2 from "../../assets/home/slide2.jpg";
import img3 from "../../assets/home/slide3.jpg";
import img4 from "../../assets/home/slide4.jpg";
import img5 from "../../assets/home/slide5.jpg";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Category = () => {
    return (
        <div>
            <SectionTitle
                heading="ORDER ONLINE"
                subheading="---From 11:00am to 10:00pm---"
            />
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper mb-20"
            >
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full" src={img1} alt="" />
                        <p className="text-3xl uppercase text-center text-white absolute top-[85%] right-[50%] translate-x-[50%]">
                            Salad
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full" src={img2} alt="" />
                        <p className="text-3xl uppercase text-center text-white absolute top-[85%] right-[50%] translate-x-[50%]">
                            Pizza
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full" src={img3} alt="" />
                        <p className="text-3xl uppercase text-center text-white absolute top-[85%] right-[50%] translate-x-[50%]">
                            Soup
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full" src={img4} alt="" />
                        <p className="text-3xl uppercase text-center text-white absolute top-[85%] right-[50%] translate-x-[50%]">
                            Dessert
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img className="w-full" src={img5} alt="" />
                        <p className="text-3xl uppercase text-center text-white absolute top-[85%] right-[50%] translate-x-[50%]">
                            Salad
                        </p>
                    </div>
                </SwiperSlide>
                {/* <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </div>
    );
};

export default Category;
