import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function(){
    async function fetchCities(){
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
/* eslint-disable */

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route /*path="/"*/ index element={<HomePage />} /> {/* // ! Default olaraq bu sehifeye gedecek Index-e gore */}
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            {/* <Route index element={<CityList cities={cities} isLoading={isLoading} />} />  */}                       {/* // ! Index Route: aid olduqu scopede eger nese tapmasa burani default olaraq gotursun */}
            {/* // Todo: Qisaca index yazilan component o demekdirki http://.../app default olaraq hemen component olacaq ilk sehife acilanda */}
            <Route index element={<Navigate replace to="cities"/>} />  {/* Navigate immediately navigate to URL "cities", replace get replaced in history stack  */}
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />  {/* // ! Nested Routes: app/cities */}
            <Route path="cities/:id" element={<City />}  />                                       {/* // ! Dynamic Routes with URL Parametr */}                                 
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />  
            {/* // ! Nested Route olarsa (Component icinde Component olarsa) Outletden istifade olunur children-deki kimi */}
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// ! <Navigate to="cities"/> bele yazdiqda geriye qayitmaq istesek problem yaradri qarsisini almaq ucun replace keyword-den istifade olunur cunki history stack-den istifade edir