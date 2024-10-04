import React, { useState } from "react";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      nextImage();
    } else if (event.key === "ArrowLeft") {
      prevImage();
    }
  };

  return (
    <section
      className="max-w-screen-xl px-6 py-6 mx-auto min-h-[800px] rounded-lg"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <h2 className="text-4xl font-bold mb-4 text-center text-primary-foreground">
        Trading Insights
      </h2>
      <div className="relative">
        <div className="flex justify-center">
          <img
            src={images[currentImage]}
            alt="Trading"
            className="w-full rounded-lg transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between">
          <button
            onClick={prevImage}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
          >
            &#10094; {/* Left Arrow */}
          </button>
          <button
            onClick={nextImage}
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-200"
          >
            &#10095; {/* Right Arrow */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
