import Mongoose from 'mongoose'
export const CondominioModel = [
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
]
