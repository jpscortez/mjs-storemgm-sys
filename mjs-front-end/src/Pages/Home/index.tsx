import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <Link to="/sales/new">
        <div className="size-40 p-6 shadow-2xl rounded-lg bg-slate-50 hover:border hover:border-dark-200 active:bg-slate-100">
          <span className="font-bold uppercase">Nova Venda</span>
          <div>
            <ShoppingBasket className="mx-auto" size={80} />
          </div>
        </div>
      </Link>
    </div>
  )
}