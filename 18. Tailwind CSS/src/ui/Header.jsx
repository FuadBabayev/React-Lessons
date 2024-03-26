import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="border-b-4 border-stone-200 px-4 py-3 uppercase flex justify-between items-center
    bg-red-600 sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-5f00 xl:bg-gray-700 2xl:bg-purple-500">
      <Link to="/" className="tracking-widest font-miltonian">
        Fast React Pizza Co.
      </Link>
      <SearchOrder /> 
      <Username />
    </header>
  );
}
export default Header;
