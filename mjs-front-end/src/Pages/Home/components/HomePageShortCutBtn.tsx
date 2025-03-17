import {LucideIcon} from "lucide-react";
import {Link} from "react-router-dom";

type HomePageShortCutBtnProps = {
	caption: string;
	icon: LucideIcon;
	to: string;
};

export function HomePageShortCutBtn({caption, icon: Icon, to}: HomePageShortCutBtnProps) {
	return (
		<Link to={to}>
			<div className="size-40 p-6 shadow-2xl rounded-lg bg-slate-50 hover:border hover:border-dark-200 active:bg-slate-100">
				<span className="font-bold uppercase">{caption}</span>
				<div>
					<Icon className="mx-auto" size={80} />
				</div>
			</div>
		</Link>
	);
}
