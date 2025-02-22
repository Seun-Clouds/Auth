const Input = ({ className, ...props }) => {
	return (
	  <input
		{...props}
		className={`w-full p-3 rounded-md bg-[#D7D6FF] pr-10 border border-black focus:outline-none focus:ring-2 focus:ring-black ${className}`}
	  />
	);
  };
  
  export default Input;
  