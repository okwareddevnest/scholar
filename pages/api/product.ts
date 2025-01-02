import { NextApiRequest, NextApiResponse } from 'next';

let products = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}