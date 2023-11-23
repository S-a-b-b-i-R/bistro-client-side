import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsQuote } from "react-icons/bs";
// Import Swiper styles BsQuote
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/reviews")
            .then((res) => res.json())
            .then((data) => {
                setReviews(data.review);
            });
    }, []);
    return (
        <div className="my-20">
            <SectionTitle
                heading="Testimonials"
                subheading="---What Our Customers Say---"
            />
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                {reviews.map((review) => (
                    <SwiperSlide key={review._id}>
                        <div className="py-10 px-32 text-center space-y-5 flex flex-col items-center">
                            <p className="text-7xl">
                                <BsQuote />
                            </p>
                            <Rating
                                style={{ maxWidth: 250 }}
                                value={review.rating}
                                readOnly={true}
                            />
                            <p>{review.details}</p>
                            <h3 className="uppercase text-amber-600 text-2xl">
                                {review.name}
                            </h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;
