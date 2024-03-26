function Stats({ allDatas }) {
  const packedItems = allDatas.filter((packedOne) => packedOne.packed === true).length;
  const percentage = (packedItems / allDatas.length) * 100;

  return (
    <>
      <footer className="stats">
        {allDatas.length === 0 
        ? (<em>Start adding some items to your packing list 🚀</em>) 
        : (<em>{percentage === 100
              ? "You got everything! Ready to go ✈️"
              : `🛒 You have ${allDatas.length} items on your list and you already packed ${packedItems} (${percentage.toFixed(1)}%)`}
          </em>
        )}
      </footer>
    </>
  );
}

export default Stats;