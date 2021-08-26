import { VercelRequest, VercelResponse } from '@vercel/node'
import Mongoose from 'mongoose'
let conn = null
export default async (request: VercelRequest, response: VercelResponse) => {
  if (conn == null) {
    conn = await Mongoose.createConnection(process.env.URI, {
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
  await conn
  const M = await conn.model(
    'Condominios',
    new Mongoose.Schema({
      CondominioName: String,
      endereco: {
        rua: String,
        bairro: String,
        cep: String,
        cidade: String,
        uf: String
      },
      contato: {
        email: String,
        whatsapp: String
      },
      Servicos: [],

      CreatedAt: { type: Date, default: Date.now },
      UpdatedAt: { type: Date, default: Date.now }
    }),
    'Clientes'
  )

  const doc = await M.find()
  return response.json(doc)
}
