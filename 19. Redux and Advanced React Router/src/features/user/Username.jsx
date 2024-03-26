import { useSelector } from 'react-redux';

function Username() {
  const user = useSelector((state) => state.user); /* console.log(user); */
  if (!user.username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{user.username}</div>
  );
}

export default Username;
