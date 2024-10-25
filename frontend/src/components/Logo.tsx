import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setIsScrolled } from "../slice/scrollSlice";
import { cn } from "../lib/utils";
import { MdInsertChart } from "react-icons/md";

const Logo = () => {
  const navigate = useNavigate();
  const isScrolled = useSelector((state: RootState) => state.scroll.isScrolled);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isScrolled) {
      dispatch(setIsScrolled(false));
    }
    navigate("/");
  };

  return (
    <button onClick={handleClick} className="flex items-center space-x-1">
      <MdInsertChart
        className={cn("size-9 rounded p-1", {
          "": !isScrolled,
          "fill-primary dark:fill-primary-foreground": isScrolled,
        })}
      />
      <span className="hidden text-lg font-bold tracking-tight md:block">
        Trade Keeper
      </span>
    </button>
  );
};

export default Logo;
