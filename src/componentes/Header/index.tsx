import style from "./styles.module.scss";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
export function Header() {
  const currentDate = format(new Date(), "EEEEEE,d MMM", {
    locale: ptBR,
  });

  return (
    <header className={style.headerContainer}>
      <img src="/logo.svg" alt="podcastr" />
      <p>O melhor pra voce ouvir,sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}
