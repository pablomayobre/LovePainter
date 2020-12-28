import { forwardRef, HTMLProps } from "react";

const Wall = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    );
  }
);


export default Wall;