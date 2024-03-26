import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu, {loader as menuLoader} from "./features/menu/Menu";                // ! Step2: Provide Loader (loader cox olacaqi ucun onu menuLoader deye cagiririq)
import Order, {loader as orderLoader} from "./features/order/Order";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder";

import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {                                     // ! Layout Route which has no path
    element: <AppLayout />,             // ! Parent Route of every single component (route) and there is no need path because Layout Route
    errorElement : <Error />,           // ! Sehv route link ve ya APIde sehvlik olduqda Error komponent daxilinde gorsenecek butun sehifeni tutmuyacaq
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader : menuLoader,     // ! Step2: we connect the Loader Function to the Route (Fetch etdiyimiz Datalari Menu-ya gonderdik)
        errorElement : <Error />,   // * Burada ona gore qoyulduki error bas verende butun sehifeni ehate etmesin sadece mueyyen yeri tutsun
      },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder />, action : createOrderAction },
      { path: "/order/:orderId", element: <Order />, loader : orderLoader, errorElement : <Error /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// ! If you want to work with data fetching (data loaders, data actions, data features) in React Router => you need "createBrowserRouter" from version 6.4+
// Todo: there is no need path="*" when certain page is not Found. Instead we use Error Handlings
