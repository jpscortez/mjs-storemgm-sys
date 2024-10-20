import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="py-4">
      <Link to="/sell">
        <div className="size-40 p-6 rounded-lg bg-slate-900 shadow-sm hover:bg-slate-700 active:bg-slate-600">
          <span className="font-bold uppercase">Nova Venda</span>
          <div>
            <ShoppingBasket className="mx-auto" size={80} />
          </div>
        </div>
      </Link>
    </div>
  )
}