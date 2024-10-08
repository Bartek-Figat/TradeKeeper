import { FC, useState, useEffect, type MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { useScroll } from "../lib/hooks/useScroll";
import { capitalizeString, cn } from "../lib/utils";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { Button, buttonVariants } from "./common/button";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signOut, checkAuth } from "../slice/authSlice";

enum NavigationLinks {
  Home = "home",
  About = "about",
  Snapshot = "snapshot",
  Features = "features",
  Testimonials = "testimonials",
  Pricing = "pricing",
  Faqs = "faqs",
  Contact = "contact",
}

interface NavbarProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  activeSection: string;
}

const Navbar: FC<NavbarProps> = ({
  searchParams,
  setSearchParams,
  activeSection,
}) => {
  const [mobileNavLinksVisible, setMobileNavLinksVisible] = useState(false);
  const isScrolled = useScroll(10, 300);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const smoothScrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("section", targetId);
      setSearchParams(newParams);
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`Element with ID ${targetId} not found.`);
    }
    setMobileNavLinksVisible(false);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        {
          "bg-background shadow-md": isScrolled,
          "#000": !isScrolled,
        }
      )}
    >
      <nav
        className={cn(
          "max-w-screen-xl px-4 py-5 mx-auto flex justify-between items-center",
          {
            "text-primary-foreground": !isScrolled,
            "text-primary dark:text-primary-foreground": isScrolled,
          }
        )}
      >
        <Logo />
        {/* nav links */}
        <div
          className={cn(
            "fixed top-0 bottom-0 right-0 w-2/3 p-4 space-y-6 backdrop-blur-md border-l border-border/50 md:static md:border-none md:p-0 md:space-y-0 md:w-auto md:translate-x-0 transition-transform ease-in-out duration-300",
            {
              "translate-x-full": !mobileNavLinksVisible,
              "#000": mobileNavLinksVisible,
            }
          )}
        >
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileNavLinksVisible(false)}
              aria-label="Close navigation menu"
            >
              <MdOutlineClose className="size-6 flex-shrink-0" />
            </Button>
          </div>
          <ul className="text-base font-bold tracking-wide flex flex-col text-center space-y-6 md:flex-row md:space-x-4 lg:space-x-8 md:space-y-0">
            {Object.values(NavigationLinks).map((link) => (
              <li key={link}>
                <a
                  onClick={(e) => smoothScrollToSection(e, link)}
                  className={cn("cursor-pointer", {
                    "text-primary-foreground/70 hover:text-inherit transition-colors duration-300":
                      !isScrolled,
                    "text-foreground/50 hover:text-inherit transition-colors duration-300 dark:hover:text-primary-foreground":
                      isScrolled,
                    "text-inherit dark:hover:text-primary-foreground":
                      activeSection === link,
                  })}
                  aria-label={`Navigate to ${capitalizeString(link)}`}
                >
                  {capitalizeString(link)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* end of nav links */}
        {/* mobile menu + outer navigation */}
        <div className="flex items-center space-x-1">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/sign-in"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "text-base font-bold",
                  })
                )}
                aria-label="Sign in"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/sign-up"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "text-base font-bold",
                  })
                )}
                aria-label="Sign up"
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <Button
              onClick={handleSignOut}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-base font-bold",
                })
              )}
              aria-label="Sign out"
            >
              Sign out
            </Button>
          )}
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setMobileNavLinksVisible(true)}
            aria-label="Open navigation menu"
          >
            <MdMenu className="size-6 flex-shrink-0" />
          </Button>
        </div>
        {/* end */}
      </nav>
    </div>
  );
};

export default Navbar;