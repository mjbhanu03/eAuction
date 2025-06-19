const Button = ({hrefLink='#', btnName='CLick Me', colorName='white'}) => {
  return(
    // <>
      <a href= {hrefLink} className={`btn-${colorName} border-[3px] rounded-xl border-${colorName === 'white' ? 'white' : colorName + '-500'} p-2 px-6`}>{btnName}</a>
    // </>
  );
}

export default Button