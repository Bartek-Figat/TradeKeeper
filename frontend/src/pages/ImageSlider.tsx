import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

// Use Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, EffectCoverflow]);

const images = [
  "https://images.unsplash.com/photo-1642142783250-d1bef1dafbc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 1
  "https://plus.unsplash.com/premium_photo-1661609098718-3408828713ba?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 2
  "https://plus.unsplash.com/premium_photo-1683141154082-324d296f3c66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 3
  "https://images.unsplash.com/photo-1642142783250-d1bef1dafbc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 1
  "https://plus.unsplash.com/premium_photo-1661609098718-3408828713ba?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 2
  "https://plus.unsplash.com/premium_photo-1683141154082-324d296f3c66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 3
  // Additional unique images can be added here
];

const ImageSlider: React.FC = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      navigation={true}
      pagination={{ clickable: true }}
      effect="coverflow"
      coverflowEffect={{
        rotate: 30, // Adjusted for a more subtle effect
        stretch: 10, // Slightly stretch the slides
        depth: 200, // Increased depth for a more pronounced effect
        modifier: 2, // Adjusted modifier for scaling
        slideShadows: true,
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true} // Enable looping
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Trading Image ${index + 1}`}
            className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110" // Added hover scale effect
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
