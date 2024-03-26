import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // const totalCartQuantity = useSelector((state)=>state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0));
  // Burada da yaza bilerdik sadece cox isledeceyimizi ucun Store-ye atdiq ki hemise istifade ede bilek
  // Todo: getTotalCartQuantity = (state)=>state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0); bu funksiyani cartSlice-de yaratdiq export etdik
  if (!totalCartQuantity || !totalCartPrice) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
