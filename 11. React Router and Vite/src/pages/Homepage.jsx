import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <>
      <PageNav />   {/*  // ! class="_nav_1ftjz_1"   baxmayaraqki her ikisi nav class-ina adidir*/}
      <AppNav />    {/*  // ! class="_nav_oz6yl_1"   CSS modules random simvollar ataraq uniquelesdirir*/}
      
      

      <h2 className="test">WorldWise</h2>
      {/* <a href="/pricing">Pricing</a> <br />
            <a href="/product">Productf</a> <br /> 
            // ! Page Reloaded with <a> anchor tag IT IS WRONG WAY */}

      {/* // Todo: We use <Link></Link> === <a> and TO === HREF without any Page Reloading */}
      <Link to="/pricing">Pricing</Link> <br />
      <Link to="/product">Product</Link> <br />
      <Link to="/app">Go to the App</Link> <br />
    </>
  );
}

export default Homepage;
