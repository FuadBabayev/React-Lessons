import { useLoaderData } from "react-router-dom";                          // ! Step3: Provide Data to the Page
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();       // ! we dont pass anything into function. useLoaderData(menuLoader) src/App-dan gelen loader : menuLoader, avtomatik argument olaraq gedir
  console.log(menu);                  // (18) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // Todo: Buradaki esas ferq eyni anda data fect edib ayeni andada render ederek UI-de gosterir, ama useEffectle etseydik render olunduqdan sonra data yuklenerdi 1 addim geri qalardi

  return (
    <ul>
      {menu.map((pizza) => <MenuItem pizza={pizza} key={pizza.id}/>)}
    </ul>
  );
}

export async function loader() {            // ! Step1: Create Loader
  const menu = await getMenu();
  return menu;                              // ! Buradaki menu-nu App-a gonderyib yeniden burada useLoaderData ile tutduq
}

export default Menu;
