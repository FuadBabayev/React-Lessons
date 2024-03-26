import { useParams, useSearchParams } from "react-router-dom";
function City() {
  /* eslint-disable */
  const params = useParams(); // ! useParams ozu Routedeki / sonrasini tutur (provided from React Router)
  console.log(params); // ! {id: '73930385'}
  const { id } = useParams(); // ! path="cities/:id" App.jsx-dan gelene id-dir

  const [query, setQuery] = useSearchParams(); // ! useParams ozu Routedeki /:d? sonrasini tutur (provided from React Router)
  const latitude = query.get('lat');        
  const longtitude = query.get('lng');
  console.log("Longtitude: " + longtitude + "\n" + "Latitude: " + latitude);

  return (
    <>
      <h1>City {id}</h1>
      <p>Position: <br /> Latitude {latitude} <br /> Longtitude {longtitude}</p>
    </>
  );
}

export default City;

// import styles from "./City.module.css";
// import ButtonBack from "./ButtonBack";

// import { useParams } from "react-router-dom";

/* eslint-disable*/
// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

// function City() {
//   const  params = useParams();          // ! useParams ozu Routedeki / sonrasini tutur
//   console.log(params);                  // ! {id: '73930385'}

//   const { id } = useParams();           // ! path="cities/:id" App.jsx-dan gelene id-dir
// TEMP DATA
// const currentCity = {
//   cityName: "Lisbon",
//   emoji: "🇵🇹",
//   date: "2027-10-31T15:59:59.138Z",
//   notes: "My favorite city so far!",
// };

// const { cityName, emoji, date, notes } = currentCity;

// return <h1>City {id}</h1>

// return (
//   <div className={styles.city}>
//     <div className={styles.row}>
//       <h6>City name</h6>
//       <h3><span>{emoji}</span> {cityName}</h3>
//     </div>

//     <div className={styles.row}>
//       <h6>You went to {cityName} on</h6>
//       <p>{formatDate(date || null)}</p>
//     </div>

//     {notes && (
//       <div className={styles.row}>
//         <h6>Your notes</h6>
//         <p>{notes}</p>
//       </div>
//     )}

//     <div className={styles.row}>
//       <h6>Learn more</h6>
//       <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noreferrer" >Check out {cityName} on Wikipedia &rarr;</a>
//     </div>

//     <div>
//       <ButtonBack />
//     </div>
//   </div>
// );
// }

// export default City;
