import {ReactNode, useRef} from "react";
import {useReactToPrint} from "react-to-print";
import {Button} from "../ui/button";
import {Printer} from "lucide-react";

type PrintableContentProps = {
	content: ReactNode;
};

export function PrintableContent({content}: PrintableContentProps) {
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({contentRef});

	return (
		<div>
			<Button size="icon" onClick={() => reactToPrintFn()}>
				<Printer />
			</Button>
			<div className="hidden print:block" ref={contentRef}>
				{content}
			</div>
		</div>
	);
}
