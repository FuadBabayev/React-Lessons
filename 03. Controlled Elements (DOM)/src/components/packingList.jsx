import Item from "./item";

const PackingList = ({ datas }) => {
  return (
    <>
      <div className="list">
        <ul>
          {datas && datas.map((item) => <Item info={item} key={item.id} />)}
        </ul>
      </div>
    </>
  );
};

export default PackingList;
