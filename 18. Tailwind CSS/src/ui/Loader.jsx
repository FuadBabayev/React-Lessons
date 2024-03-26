function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/40 backdrop-blur-sm">      {/* // ! For Positioning PARENT element MUST BE */}
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
