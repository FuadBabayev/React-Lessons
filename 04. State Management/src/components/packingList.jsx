import { useState } from "react";
import Item from "./item";

const PackingList = ({ datas, onDelete, onToggle, onClear }) => {
  const [sortBy, setSortBy] = useState('input');
  
  let sortedDatas;
  if (sortBy === 'input') sortedDatas = datas;
  if (sortBy === 'description') sortedDatas = datas.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed' ) sortedDatas = datas.slice().sort((a, b) => Number(a.packed) - Number(b.packed))

  return (
    <>
      <div className="list" >
        <ul>
          {sortedDatas && sortedDatas.map((item) => <Item info={item} key={item.id} funk={onDelete} funk2={onToggle} />)}
        </ul>

        <div className="actions">
          <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
            <option value="input">Sort by input Order</option>
            <option value="description" >Sort by Description</option>
            <option value="packed" >Sort by Packed Status</option>
          </select>

          <button onClick={onClear}>Clear list</button>
        </div>
      </div>
    </>
  );
};

export default PackingList;
