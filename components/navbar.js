
import Button from "./button";

export default function Navbar() {
    return (
      <nav className="flex justify-between items-center m-10">
        <img src="/logo.svg" alt="Book my hotel" className="h-10" />
        <div className='mr-6'>
          {/* <a href="#" className="mr-4">Home</a> */}
          {/* <a href="#">About</a> */}
          {/* TODO : ADD a button */}
          {/* <Button className='' target='_blank' href=''>Get in touch!</Button> */}
        </div>
      </nav>
    );
}