import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function SellPage() {
  const addedProducts = [
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999
    },
    {
      name: 'Microsoft Surface Pro',
      code: 0,
      category: 'Laptop PC',
      price: 1999
    },
    {
      name: 'Magic Mouse 2',
      code: 0,
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: 0,
      category: 'Accessories',
      price: 99
    },
  ]

  return (
    <div className="w-full my-6 p-6 rounded-lg bg-slate-700">
      <div>
        <h2 className="text-2xl py-4">Venda</h2>
      </div>
      <div className="flex flex-col min-h-96 gap-2">
        <div className="flex gap-2 items-end">
          <div>
            <span>CÓDIGO</span>
            <Input type="number" placeholder="XXXX" className="remove-arrow" />
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
        <div className="p-4 rounded-lg bg-slate-900">
          <div className="flex flex-row uppercase font-bold gap-2">
            <div className="text-sm w-10">
              #
            </div>
            <div className="text-sm flex-1">
              descrição
            </div>
            <div className="text-sm w-20 text-center">
              qtde
            </div>
            <div className="text-sm w-20 text-right">
              preço UN
            </div>
            <div className="text-sm w-20 text-right">
              Preço
            </div>
          </div>
          <ScrollArea className="h-72">
            {addedProducts.map((product, i) => (
              <>
                <Separator className="my-2" />
                <div key={i} className="flex flex-row gap-2">
                  <div className="text-sm w-10">
                    {product.code}
                  </div>
                  <div className="text-sm flex-1">
                    {product.name}
                  </div>
                  <div className="text-sm w-20 text-center">
                    3
                  </div>
                  <div className="text-sm w-20 text-right">
                    {product.price.toFixed(2)}
                  </div>
                  <div className="text-sm w-20 text-right">
                    {(product.price * 3).toFixed(2)}
                  </div>
                </div>
              </>
            ))}
          </ScrollArea>
        </div>
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
        <Button>CONCLUIR</Button>
      </div>
    </div>

  )
}