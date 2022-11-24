import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, ...props }: ButtonProps, ref) => (
		<button
			className={cn(
				"relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400",
				className,
			)}
			ref={ref}
			{...props}
		/>
	),
);
