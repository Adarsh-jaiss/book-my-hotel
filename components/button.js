import React from 'react';


// Button component using anchor tag
const Button = ({ className, href, children, ...props }) => {
  const buttonClass = `inline-block px-6 py-4 bg-blue-800 text-white font-large subpixel-antialiased text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${className}`;

  return (
    <a href={href} className={buttonClass} {...props}>
      {children}
    </a>
  );
};

export default Button;