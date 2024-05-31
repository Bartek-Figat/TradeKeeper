import { FC, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SwiperSlide, Swiper } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import 'swiper/css';
import 'swiper/swiper-bundle.css';

const slideData = [
  {
    image: "/images/authentication/auth-1.png",
    description: "Step into the world of TradeKeeper, your one-stop solution for journal marketing. Learn how our platform can enhance your marketing strategies and connect you with a global audience."
  },
  {
    image: "/images/authentication/auth-2.png",
    description: "TradeKeeper is more than a platform - it's a community. Connect with professionals, share insights, and grow your network. Join us and be part of a vibrant community of journal marketers."
  },
  {
    image: "/images/authentication/auth-3.png",
    description: "Trade Keeper is a comprehensive trading journal designed to enhance your trading skills and optimize your investment strategies. Trade Keeper: Your go-to platform for mastering trading with ease and precision."
  }
];

const AuthLayout: FC = () => {
  const { pathname } = useLocation();
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const displaySlideHeader = (): string => {
    if (pathname === "/sign-in") {
      return "Sign In";
    }
    else if (pathname === '/sign-up') {
      return "Sign Up";
    }
    else {
      return "Reset password";
    }
  }

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      });
    }
  }, [swiper]);

  return (
    <div className="grid grid-cols-12 grid-flow-col h-dvh">
      <div className="col-span-5 order-2 flex items-center justify-center relative bg-[url('/images/layouts/forest.jpeg')] 
        bg-no-repeat bg-cover before:content-[''] before:absolute before:left-0 before:h-full 
        before:w-full before:bg-black/[50%] before:z-10 max-[1200px]:hidden"
      >
        <div
          className="relative max-w-[25.5rem] bg-black/[25%] backdrop-blur z-20 p-10"
        >
          <img
            onClick={() => swiper?.slidePrev()}
            className={`absolute top-[50%] left-[2rem] z-10 rotate-90 brightness-[4] bg-black/[50%] p-1 rounded-lg cursor-pointer 
            ${isBeginning ? 'swiper-button-disabled' : ''}`}
            src="/images/icon/icon-arrow-down.svg"
            alt="click to see previous slide"
            loading="lazy"
          />
          <Swiper
            slidesPerView={1}
            spaceBetween={50}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              renderBullet: (_, className) => {
                return `<div class='${className} custom-bullet'></div>`;
              }
            }}
            modules={[Pagination, Navigation, Autoplay]}
            onSwiper={(swiperInstance) => {
              setSwiper(swiperInstance);
              setIsBeginning(swiperInstance.isBeginning);
              setIsEnd(swiperInstance.isEnd);
            }}
          >
            {slideData.map((slide, index) => (
              <SwiperSlide key={index}>
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <p className="text-white text-center font-semibold mb-1">{displaySlideHeader()}</p>
                <p className="text-sm text-center text-white w-[90%] m-auto opacity-[0.7]">{slide.description}</p>
              </SwiperSlide>
            ))}
          </Swiper>
          <img
            onClick={() => swiper?.slideNext()}
            className={`absolute top-[50%] right-[2rem] z-10 rotate-[-90deg] brightness-[4] bg-black/[50%] p-1 rounded-lg cursor-pointer 
            ${isEnd ? 'swiper-button-disabled' : ''}`}
            src="/images/icon/icon-arrow-down.svg"
            alt="click to see next slide"
            loading="lazy"
          />
          <div className="swiper-pagination"></div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;