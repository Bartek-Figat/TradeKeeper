import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setIsScrolled } from "../../slice/scrollSlice";

export const useScroll = (threshold: number, delay: number): boolean => {
  const isScrolled = useSelector((state: RootState) => state.scroll.isScrolled);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          const scrollPosition = window.scrollY;
          dispatch(setIsScrolled(scrollPosition > threshold));
          timeoutId = null;
        }, delay);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, delay, dispatch]);

  return isScrolled;
};
