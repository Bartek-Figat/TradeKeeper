import { FC, useState, type MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import { useScroll } from "../lib/hooks/useScroll";
import { capitalizeString, cn } from "../lib/utils";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import { Button, buttonVariants } from "./common/button";
import Logo from "./Logo";

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
  //const navigate = useNavigate();
  const [mobileNavLinksVisible, setMobileNavLinksVisible] = useState(false);
  const isScrolled = useScroll(10, 300);

  const smoothScrollToSection = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId: string,
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

  return (
    <div
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        {
          "bg-background shadow-md": isScrolled,
          "#000": !isScrolled,
        },
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-screen-xl items-center justify-between px-4 py-5",
          {
            "text-primary-foreground": !isScrolled,
            "text-primary dark:text-primary-foreground": isScrolled,
          },
        )}
      >
        <Logo />
        {/* nav links */}
        <div
          className={cn(
            "fixed bottom-0 right-0 top-0 w-2/3 space-y-6 border-l border-border/50 p-4 backdrop-blur-md transition-transform duration-300 ease-in-out md:static md:w-auto md:translate-x-0 md:space-y-0 md:border-none md:p-0",
            {
              "translate-x-full": !mobileNavLinksVisible,
              "#000": mobileNavLinksVisible,
            },
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
          <ul className="flex flex-col space-y-6 text-center text-base font-bold tracking-wide md:flex-row md:space-x-4 md:space-y-0 lg:space-x-8">
            {Object.values(NavigationLinks).map((link) => (
              <li key={link}>
                <a
                  onClick={(e) => smoothScrollToSection(e, link)}
                  className={cn("cursor-pointer", {
                    "text-primary-foreground/70 transition-colors duration-300 hover:text-inherit":
                      !isScrolled,
                    "text-foreground/50 transition-colors duration-300 hover:text-inherit dark:hover:text-primary-foreground":
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
          <NavLink
            to="/sign-in"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-base font-bold",
              }),
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
              }),
            )}
            aria-label="Sign up"
          >
            Sign up
          </NavLink>

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
