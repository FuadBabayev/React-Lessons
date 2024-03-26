import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();       // ! useNavigate-den ferqli olaraq her hansisa sehifeye yonlendirmir sadece STATE deyeri olur loading & idle 
  const isLoading = navigation.state === "loading";  // Todo: Buna esase sehifede Loading olub olmamasini yoxlayiriq
  // console.log(navigation);               // {state: 'idle || loading', location: undefined ...} Buna esasen Loading page teyin edirik

  return (
    <div className="layout">
        {isLoading && <Loader />}
      <Header />

      <main>
        <Outlet />      {/* // ! Outlet: Renders the content of nested route inside parent route */}
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
