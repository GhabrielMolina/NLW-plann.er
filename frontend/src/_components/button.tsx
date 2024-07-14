import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded-lg font-medium px-5 justify-center flex items-center gap-2",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

// children: when you want to pass content to the component with ReactNode
// ComponentProps<'button'> to be able to receive all the functions from one button, passing ...props
// VariantProps<typeof buttonVariants> to be able to receive the variant prop
interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
}
