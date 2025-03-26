import React from "react";

const Container = ({
  className = "",
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`lg:w-[80%] md:w-[90%] w-[95%] m-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
