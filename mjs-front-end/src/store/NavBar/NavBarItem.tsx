import { NavLink, NavLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface NavBarItemProps extends NavLinkProps {
  caption: string
}

export default function NavBarItem({ caption, ...rest }: NavBarItemProps) {
  return (
    <NavLink {...rest}
      className={({ isActive }) =>
        twMerge("flex items-center my-2 px-4 rounded-lg hover:bg-slate-700  active:bg-slate-600",
          isActive
            ? "font-bold underline"
            : "font-light")
      }
    >
      <span>
        {caption}
      </span>
    </NavLink>
  )
}