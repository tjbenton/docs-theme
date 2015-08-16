import Nav from "./nav";
let SiteHeader = React.createClass({
 render(){
  return (
   <header className="s-header">
    This is the Header yo
    <Nav items={["Home", "Services", "About", "Contact us"]} />
   </header>
  )
 }
});

export default SiteHeader;