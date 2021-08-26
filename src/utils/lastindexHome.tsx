/* eslint-disable no-use-before-define */
import { parseISO } from 'date-fns'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from 'next'
import React from 'react'
import { api } from '../services/api'
import styles from '../styles/home.module.scss'

// endereco?: {
//   rua: String,
//   bairro: String,
//   cep: String,
//   cidade: String,
//   uf: String
// },
// contato: {
//   email: String,
//   whatsapp: String
// },
type Condominio = {
  id: string
  CondominioName: String
  endereco: {
    rua: String
    bairro: String
    cep: String
    cidade: String
    uf: String
  }
  contato: {
    email: String
    whatsapp: String
  }
  Servicos: []

  CreatedAt: { type: Date }
  UpdatedAt: { type: Date }
}
type HomeProps = {
  data: Condominio[]
}
export default function Home({ data }: HomeProps) {
  return (
    <section className={styles.allEpisodes}>
      <h2>Todos Episodios</h2>
      <table cellSpacing={0}>
        <thead>
          <th></th>
          <th>Podcast</th>
          <th>integrantes</th>
          <th>Data</th>
          <th>Duração</th>
          <th></th>
        </thead>
        <tbody>
          {data.map(condominio => {
            return (
              <tr key={condominio.id}>
                <td style={{ width: 100 }}></td>
                <td>
                  <a href="">{condominio.CondominioName}</a>
                </td>
                {/* <td >{condominio.members}</td> */}
                <td style={{ width: 120 }}>{condominio.CreatedAt}</td>
                <td>{condominio.UpdatedAt}</td>
                <td>
                  <button type="button">
                    <img src="/play-green.svg" alt="tocar" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/api')

  const condominios = data.map(condominio => {
    return {
      id: condominio._id,
      CondominioName: condominio.Name
        ? condominio.Name
        : condominio.CondominioName,
      Servicos: condominio.Servicos ? condominio.Servicos : condominio.Servico,
      CreatedAt: format(parseISO(condominio.CreatedAt), 'd MMM yy', {
        locale: ptBR
      }),
      UpdatedAt: format(parseISO(condominio.UpdatedAt), 'd MMM yy', {
        locale: ptBR
      })
    }
  })
  // console.log(condominios)
  // const allCondominios =  JSON.stringify(condominios)

  return {
    props: {
      data: condominios
    },
    revalidate: 60 * 60 * 8
  }
}
