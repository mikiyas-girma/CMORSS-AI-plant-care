import React, { useCallback, useEffect, useRef, useState } from 'react';
import GenericButton from './GenericButton';

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  cardWidth: string;
  containerClassName?: string;
  cardClassName?: string;
};

const ReusableCarousel = <T,>({
  items,
  renderItem,
  autoPlay = true,
  autoPlayInterval = 2000,
  pauseOnHover = true,
  cardWidth,
  containerClassName = '',
  cardClassName = '',
}: CarouselProps<T>) => {
  // Define Ref And States
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  //   The Function handling Scroll Next
  const handleScrollNext = useCallback(() => {
    if (!scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth;
    const percentage = scrollPercentage + 100 / (scrollWidth / clientWidth);
    scrollRef.current.scrollLeft += clientWidth;
    setScrollPercentage(percentage);
  }, [scrollPercentage]);

  // The function that handls scrolling to previous
  // View or Scroll Left
  const handleScrollPrev = () => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    const percentage =
      scrollPercentage - 100 / (scrollRef.current.scrollWidth / clientWidth);
    scrollRef.current.scrollLeft -= clientWidth;
    setScrollPercentage(percentage);
  };

  //   Set up useEffect to handle Auto Play
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      if (!scrollRef.current || (pauseOnHover && isHovering)) return;

      if (scrollPercentage < 110) {
        handleScrollNext();
      } else {
        scrollRef.current.scrollLeft = 0;
        setScrollPercentage(0);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    handleScrollNext,
    isHovering,
    scrollPercentage,
    autoPlay,
    autoPlayInterval,
    pauseOnHover,
  ]);

  //   If No items were passed into the function, then return.
  if (!items || items.length === 0) return null;

  //   REturns the JSX
  return (
    <div className="relative flex w-full flex-col justify-center gap-5">
      <div
        ref={scrollRef}
        className={`scrollbar-hide flex gap-3 overflow-x-scroll px-10 scroll-smooth ${containerClassName}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`mb-6 ${cardWidth} rounded-lg overflow-hidden relative ${cardClassName}`}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      <div className="flex gap-5 -mt-5 pb-4 justify-center">
        <GenericButton
          disabled={scrollPercentage === 0}
          onClick={handleScrollPrev}
        >
          Prev
        </GenericButton>

        <GenericButton
          disabled={scrollPercentage > 120}
          onClick={handleScrollNext}
        >
          Next
        </GenericButton>
      </div>
    </div>
  );
};

export default ReusableCarousel;
