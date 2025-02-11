import { NavLink, NavLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Home, LucideIcon } from "lucide-react";

interface NavBarItemProps extends NavLinkProps {
  caption: string
  icon?: LucideIcon
}

export default function SideBarItem({ caption, icon: Icon = Home, ...rest }: NavBarItemProps) {
  return (
    <NavLink {...rest}
      className={({ isActive }) =>
        twMerge("flex justify-between items-center py-2 px-4 hover:bg-slate-600 ",
          isActive
            ? "font-extrabold bg-slate-700"
            : "font-extralight")
      }
      children={({ isActive }) => (
        <>
          <div className="flex items-center gap-2">
            <Icon size={16} />
            <span>
              {caption}
            </span>
          </div>
          <div className={isActive ? "size-2 bg-blue-500 rounded-full" : "hidden"} />
        </>

      )}
    >
    </NavLink>
  )
}