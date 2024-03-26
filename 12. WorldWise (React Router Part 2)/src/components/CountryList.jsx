import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';

/* eslint-disable */ 
function CountryList({cities, isLoading}) {
    if(isLoading) return <Spinner />
    if(!cities.length) return <Message message='Add your first city by clicking on a city on the map' />

    const countries = cities.reduce((acc, curr)=> {
        if(!acc.map(el => el.country).includes(curr.country)){
            // return [...acc, curr];
            return [...acc, {country : curr.country, emoji : curr.emoji}];
        } else {
            return [...acc];
        }
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country, i) => <CountryItem country={country} key={i}/>)}
        </ul>
    )
}

export default CountryList;
