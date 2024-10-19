import ProductsTable from "./components/ProductsTable"

export default function Products() {

  const products = [
    {
      name: 'Apple MacBook Pro 17"',
      code: 0,
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
      price: 98
    },
    {
      name: 'Magic Mouse 2',
      code: 0,
      category: 'Accessories',
      price: 99
    },
  ]

  return (
    <div className="w-10/12 mx-auto pt-4">
      <ProductsTable products={products} />
    </div>

  )
}