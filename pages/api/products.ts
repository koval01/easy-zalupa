import type { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

type ResponseData = {
  success: boolean;
  response?: []
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const response = await fetch('https://easydonate.ru/api/v3/shop/products', {
      headers: { "Shop-Key": process.env.API_KEY || "" }
    });
    const data: ResponseData = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({ success: false });
  }
}
