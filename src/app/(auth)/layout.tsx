import Logo from "@/components/logo";
import React from "react";

type Props = {};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo fontSize="text-4xl" />
      {children}
    </div>
  );
};

export default layout;
