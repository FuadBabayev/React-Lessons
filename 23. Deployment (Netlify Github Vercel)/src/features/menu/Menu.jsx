import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
// import { useSelector } from 'react-redux';

function Menu() {
  const menu = useLoaderData();
  // const state = useSelector((state)=>state.cart.cart); 
  // const items = state.filter((item)=> item.pizzaId.contains(menu.id));
  // console.log(menu, state, items);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
