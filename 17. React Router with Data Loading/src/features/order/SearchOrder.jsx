import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";


function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if(!query) return;  
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search order number" value={query} onChange={(e) => setQuery(e.target.value)} />
      </form>
    </>
  );
}


export default SearchOrder;
