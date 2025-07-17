const Card = () => {
  return(
    <div className="flex flex-col border-0 rounded-3xl text-white p-4 w-56 h-26 justify-center" style={{backgroundColor: 'olive'}}>
      {/* Left Content */}
      <div className="flex justify-around h-full items-center">
        <div className="w-1/3">Hey</div>
        <div className="w-2/3">There andakn</div>
      </div>

      {/* Right Content */}
      <div className="flex justify-between h-full items-center">
        <div>Hey</div>
        <div>There</div>
      </div>
    </div>
  );
} 

export default Card;