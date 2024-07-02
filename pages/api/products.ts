import type { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from "@/utils/rate-limit";

export const runtime = 'edge';

type ResponseData = {
  success: boolean;
  response?: []
}

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await limiter.check(res, 50, "API_PRODUCTS_RATE");
    try {
      const response = await fetch('https://easydonate.ru/api/v3/shop/products', {
        headers: { "Shop-Key": process.env.API_KEY || "" }
      });
      const data: ResponseData = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(200).json({ success: false });
    }
  } catch {
    res.status(429).json({ success: false });
  }
}
