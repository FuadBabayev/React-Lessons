import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

/* eslint-disable */
function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const {lat, lng} = position;
  return (
    <li>
      {/* // !  to={`${id}`} : Dynamic Routes with URL Parameter and we use (useParams) in order to find what we want */}
      {/* // !  to={`...?lat=${lat}&lng=${lng}`} : Query String  and we use (useSearchParams) in order to find what we want */}
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
