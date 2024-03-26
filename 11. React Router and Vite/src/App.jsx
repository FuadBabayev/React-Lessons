import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import CssStyling from "./pages/CssStyling";
import AppLayout from "./pages/AppLayout";
import Store from "./pages/Store";

function App() {
  return (
    <div className="app">
      <h1>React Router!</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="styling" element={<CssStyling />} />   
          <Route path="store" element={<Store />} />   
          <Route path="app" element={<AppLayout />} />   
          <Route path="*" element={<PageNotFound />} />   
           {/* // Todo: path="/" Root (Main) page */}
           {/* // Todo: path="*" catch all the routes that were not matched to one of these other components route  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
