import { VercelRequest, VercelResponse } from '@vercel/node'
import getConn from '../../services/GetIndex'
import { CondominioModel } from '../../services/Models/Condominios'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { doc } = await getConn(CondominioModel)

  return response.json(doc)
}
