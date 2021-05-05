import React from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { api } from '../services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToString } from '../utils/ConvertDurationToTimeString'
import styles from '../styles/home.module.scss'
type Episode = {
  id: string;
  title: string;
  members: string;
  description:string,
  duration:number,
  durationAsString:string,
  thumbnail:string,
  url:string,
  publishedAt:string

};
type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes:Episode[]

};
export default function Home ({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homePage}>
     <section className={styles.latestEpisodes}>
<h2> Ultimos Lançamentos</h2>
<ul>
{
  latestEpisodes.map(episode => {
    return (
    <li key={episode.id}>
      <div className={styles.image}>

      
    <Image
width={192}
height={192}
src={episode.thumbnail}
alt={episode.title}
objectFit='cover'
/>
</div>

<div className={styles.episodeDetails}>

  <a href="">{episode.title}</a>

  <p>{episode.members}</p>

  <span>{episode.publishedAt}</span>
  <span>{episode.durationAsString}</span>
</div>
          <button type="button">
             <img src="/play-green.svg" alt="Tocar"/>
          </button>
    </li>)
  })
}
</ul>
     </section>

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
      {allEpisodes.map(episode=>{
        return(
          <tr key={episode.id}>
            <td style={{width:100}}>
              <div className={styles.image}> 
              <Image 
              src={episode.thumbnail}
              width={120}
              height={120}
              alt={episode.title}
              objectFit={'cover'}
              />
              </div>
            </td>
            <td>
              <a href="">{episode.title}</a>
            </td>
            <td >{episode.members}</td>
            <td style={{width:120}}>{episode.publishedAt}</td>
            <td>{episode.durationAsString}</td>
            <td>
              <button type="button">
                <img src='/play-green.svg' alt="tocar"/>
              </button>
            </td>
          </tr>
        )
      })}
    </tbody>

  </table>

     </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limite: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)
  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}
