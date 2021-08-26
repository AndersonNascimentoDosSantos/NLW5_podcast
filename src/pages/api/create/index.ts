import { VercelRequest, VercelResponse } from '@vercel/node'
// import Condominios from '../../../services/models/Condominios'
// async function create(req: VercelRequest, res: VercelResponse) {
//   const { CondominioName, endereco, contato, Servicos } = req.body
//   // const joboferter = await JobOferter.create({...Oferter,image_name,
//   //      image_size,
//   //      image_key,
//   //      image_url,})
//   console.log(JSON.parse(contato))
//   const joboferter = await Condominios.create({
//     CondominioName,
//     endereco: JSON.parse(endereco),
//     contato: JSON.parse(contato),
//     Servicos: Servicos.split(',').map(String)
//   })
//   return res.json(joboferter)
// }
export default async (request: VercelRequest, respose: VercelResponse) => {
  respose.json({
    create: 'ok'
  })
}
