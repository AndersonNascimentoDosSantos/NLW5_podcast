import Head from "next/head";
import Image from "next/image";
import { Header } from "../componentes/Header";

export default function Home(props) {
  return (
    <div>
       <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
