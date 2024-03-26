import { useNavigate,  useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams(); 
    // console.log(searchParams);
    console.log("Longtitude: " + searchParams.get('lng') + "\n" + "Latitude: " + searchParams.get('lat'));
    const latitude = searchParams.get('lat');        // ! Proper key must be included in order to find
    const longtitude = searchParams.get('lng');      // ! Proper key must be included in order to find
    return (
        <div className={styles.mapContainer} onClick={()=> setTimeout(()=> navigate('form'), 300) }>         {/* navigate('form') dirnaq icerisinde URL veririk */}
            <h1>Map</h1> 
            <p>Position: <br /> Latitude {latitude} <br /> Longtitude {longtitude}</p>
            <button onClick={()=>setSearchParams({lat: 23, lng: 50})}>Change Position</button>
        </div>
    )
}

export default Map
