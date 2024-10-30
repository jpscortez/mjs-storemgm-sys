import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SellInputs() {
    return (
        <div className="flex gap-2 items-end">
            <div>
                <span>CÓDIGO</span>
                <Input
                    type="number" placeholder="XXXX" className="remove-arrow" />
            </div>
            <div>
                <span>DESCRIÇÃO</span>
                <div className="remove-arrow w-60 h-9 px-3 py-1 uppercase text-slate-500 bg-slate-800 rounded-md">
                    teste
                </div>
            </div>
            <div>
                <span>QTDE</span>
                <Input type="number" placeholder="" className="remove-arrow" />
            </div>
            <div>
                <span>DESCONTO</span>
                <Input type="number" placeholder="" className="remove-arrow" />
            </div>
            <div className="flex-1" />

            <Button>ADICIONAR</Button>
        </div>
    )
}