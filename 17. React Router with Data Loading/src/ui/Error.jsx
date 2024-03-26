import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError(); // ! Eynile Menu-daki useLoaderData kmi hec bir argument gondermirik cunki ozu avtomatik bilirki errorElement : <Error />
  // ! parametr kimi gedir bundan elave APIde problem yaranarsa throw Error da bura daxil olur
  // console.log(error); // ErrorResponseImpl {status: 404, statusText: 'Not Found', data: 'Error: No route matches URL "/cart/1231231"'}

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
