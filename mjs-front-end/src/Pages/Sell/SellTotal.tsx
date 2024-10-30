export default function SellTotal() {
    return (
        <div className="flex justify-between px-2">
            <h3 className="font-bold text-2xl">TOTAL</h3>
            <div className="flex p-2">
                <div className="flex flex-col w-20 text-center">
                    <b>QTDE</b>
                    <span className="text-xl">
                        12
                    </span>
                </div>
                <div className="flex flex-col w-40 text-right">
                    <b>TOTAL A PAGAR</b>
                    <span className="text-xl">
                        {(15588).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    )
}