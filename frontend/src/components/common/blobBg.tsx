import { ReactNode } from "react";
import { cn } from "../../lib/utils";

const BlobBg = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute top-10 left-10 w-56 h-56 bg-accent rounded-full blur-xl animate-blob"></div>
      <div className="absolute top-12 right-16 w-56 h-56 bg-primary-foreground rounded-full blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-56 h-56 bg-primary-foreground rounded-full blur-xl animate-blob animation-delay-4000"></div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default BlobBg;
