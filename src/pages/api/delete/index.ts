import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (request: VercelRequest, respose: VercelResponse) => {
  respose.json({
    delete: 'ok'
  })
}
