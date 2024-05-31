import { FC } from "react";

const OtherOptionsLogin: FC = () => {
  return (
    <div className="flex gap-1.5 max-[320px]:flex-col">
      <button
        className="flex items-center gap-2 bg-[#EEF0F2] py-1.5 px-4 rounded-lg"
        type="button"
      >
        <img className="w-8" src="/images/brand/brand-01.svg" alt="log in by google" loading="lazy" />
        <p className="text-[0.95rem]">Sign In with google</p>
      </button>
      <div className="flex items-center gap-1.5">
        <button type="button">
          <img className="w-8" src="/images/brand/brand-05.svg" alt="log in by facebook" loading="lazy" />
        </button>
        <button type="button">
          <img className="w-8" src="/images/brand/brand-02.svg" alt="log in by twitter" loading="lazy" />
        </button>
      </div>
    </div>
  );
}

export default OtherOptionsLogin;