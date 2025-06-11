import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "text-slate-900 hover:bg-slate-200",
				destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
				outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
				filled: "bg-slate-900 hover:bg-slate-700 text-slate-50",
				success: "bg-green-600 hover:bg-green-700 active:bg-green-500 text-green-50",
				secondary: "bg-slate-100 hover:bg-slate-300 text-slate-900",
				ghost: "hover:bg-slate-100 hover:text-slate-900",
				link: "text-slate-900 underline-offset-4 hover:bg-slate-200",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
			allign: {
				center: "items-center justify-center",
				left: "!items-left !justify-left",
				right: "!items-right !justify-right",
				inherit: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			allign: "center",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({className, variant, size, asChild = false, ...props}, ref) => {
		const Comp = asChild ? Slot : "button";
		return <Comp className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />;
	}
);
Button.displayName = "Button";

export {Button, buttonVariants};
