import Link from "../router";
import Nav from "./nav";
export default class _Header extends React.Component{
 render(){
  return (
   <header className="s-header">
    <Nav items={["Home", "Services", "About", "Contact us"]} />
   </header>
  )
 };
};

// <Link to="page" params={{splat: "home/fuck/me"}}>Home</Link>
export default _Header;