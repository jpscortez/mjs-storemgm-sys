import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProductsTableProps {
  products: any[]
}

export default function ProductsTable({ products }: ProductsTableProps) {

  return (
    <Table>
      <TableHeader>
        <TableRow className="uppercase">
          <TableHead className="w-6 text-center">Código</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="w-18">Categoria</TableHead>
          <TableHead className="w-12 text-right">Preço (R$)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium text-center">{product.code}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell className="text-right">{product.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}