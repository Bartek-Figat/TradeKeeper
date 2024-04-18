import { useState } from "react";
import classNames from "classnames";

const LandingPage: React.FC = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className="bg-lime-100 min-h-screen">
      <div className={classNames("bg-background text-foreground", theme)}>
        <div className="mb-20">
          <button
            className="border-destructive border p-3"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "switch to dark" : "switch to light"}
          </button>
        </div>
        <div className="p-10">
          <div className="space-x-3">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
              primary
            </button>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full">
              secondary
            </button>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-full">
              accent
            </button>
            <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full">
              destrutive
            </button>
            <button className="bg-destructive/80 text-destructive-foreground px-4 py-2 rounded-full">
              opacity eg.: destructive/80
            </button>
          </div>
          <div className="my-10">
            <h1 className="">normal text</h1>
            <h1 className="text-muted-foreground">muted text</h1>
          </div>
          <div className="my-10">
            <input
              type="text"
              className="border-input border"
              placeholder="border test"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
