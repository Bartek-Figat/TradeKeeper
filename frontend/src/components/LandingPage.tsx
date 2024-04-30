import { ReactNode, memo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import heroImage from "../img/hero.png";

import Navbar from "./Navbar";
import { buttonVariants } from "./ui/button";
import BlobBg from "./ui/blobBg";

const LandingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionQuery = {
    activeSection: searchParams.get("section") ?? "home",
    searchParams,
    setSearchParams,
  };

  return (
    <div className="bg-background text-foreground min-h-screen antialiased">
      <Navbar {...sectionQuery} />
      <SectionWrapper id="home" {...sectionQuery}>
        <section className="h-dvh bg-primary px-6 lg:px-10 relative overflow-hidden">
          {/* bg circles */}
          <div className="bg-primary-foreground opacity-15 blur-xl w-72 h-72 rounded-full absolute -bottom-10 -right-10"></div>
          <div className="bg-primary-foreground opacity-15 blur-xl w-[800px] h-[800px] rounded-full absolute -top-48 -left-72"></div>
          {/* end of bg circles */}
          <header className="h-dvh max-w-screen-xl mx-auto py-20 flex flex-col items-center justify-evenly lg:flex-row">
            <div className="text-center max-w-[500px] flex-grow md:flex-grow-0 flex flex-col justify-evenly lg:text-start">
              {/* h1 + subheading and action btn */}
              <div className="space-y-12">
                <h1 className="text-primary-foreground font-bold text-6xl lg:text-[5.5rem] leading-[1.1]">
                  Trading journal for the people.
                </h1>
                <p className="text-primary-foreground/80">
                  Looking for a free and ad free trading journal that's fast,
                  easy to use and comprehensive enough to seamlessly integrate
                  into your daily routine? Look no further!
                </p>
              </div>
              <div className="mt-8 group relative w-fit mx-auto lg:mx-0">
                <div className="absolute -inset-0.5 bg-accent rounded-lg blur opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-300"></div>
                <Link
                  to="/dashboard"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className:
                      "relative text-foreground font-semibold w-[180px]",
                  })}
                >
                  Get Started
                </Link>
              </div>
              {/* end */}
            </div>
            {/* hero image */}
            <BlobBg className="hidden md:block">
              <div className="relative">
                <img
                  src={heroImage}
                  className="w-full object-cover object-bottom"
                />
              </div>
            </BlobBg>
            {/* end */}
          </header>
        </section>
      </SectionWrapper>
      <SectionWrapper id="about" {...sectionQuery}>
        <section className="max-w-screen-xl px-4 py-6 mx-auto bg-lime-200 min-h-[800px]"></section>
      </SectionWrapper>
      <SectionWrapper id="pricing" {...sectionQuery}>
        <section className="max-w-screen-xl px-4 py-6 mx-auto bg-lime-400 min-h-[800px]"></section>
      </SectionWrapper>
      <SectionWrapper id="team" {...sectionQuery}>
        <section className="max-w-screen-xl px-4 py-6 mx-auto bg-lime-600 min-h-[800px]"></section>
      </SectionWrapper>
      <SectionWrapper id="contact" {...sectionQuery}>
        <section className="max-w-screen-xl px-4 py-6 mx-auto bg-lime-800 min-h-[800px]"></section>
      </SectionWrapper>
    </div>
  );
};

export default LandingPage;

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  activeSection: string;
}

const SectionWrapper = memo(
  ({
    id,
    children,
    activeSection,
    searchParams,
    setSearchParams,
  }: SectionWrapperProps) => {
    const { ref, inView } = useInView({ threshold: 0.6 });

    useEffect(() => {
      if (inView && activeSection !== id) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("section", id);
        setSearchParams(newParams);
      }
    }, [inView]);

    return (
      <div ref={ref} id={id}>
        {children}
      </div>
    );
  }
);
