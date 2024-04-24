import { ReactNode, memo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Navbar from "./Navbar";

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
        <header className="min-h-[800px] pt-32 bg-primary">hero</header>
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
