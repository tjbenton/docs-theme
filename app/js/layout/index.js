import { Link } from "react-router-component";
import Header from "./header";
import Nav from "./nav";
import Footer from "./footer";
import View from "./view";
import DocsStore from "../stores/DocsStore";
import Search from "../components/search";

var InitialNav = [{
 title: "Home",
 href: "/",
 body: [],
 subpages: []
}];

let Layout = React.createClass({
 getInitialState(){
  let data = DocsStore.getDocs();
  return {
   nav: data.nav || InitialNav,
   pages: data.pages || [],
   loading: true
  };
 },

 componentWillMount(){
  DocsStore.init();
 },

 componentDidMount(){
  DocsStore.addChangeListener(this.updateDocs);
 },

 componentWillUnmount(){
  DocsStore.removeChangeListener(this.updateDocs);
 },

 updateDocs(){
  if(!this.isMounted()){
   return;
  }

  let data = DocsStore.getDocs();

  this.setState({
   nav: InitialNav.concat(data.nav),
   pages: data.pages,
   loading: false
  });
 },

 render(){
  return (
   <div>
    <header className="s-header">
     This is the Header yo
    </header>
    <Nav items={this.state.nav} />
    {this.props.children && React.Children.map(this.props.children, (child) => child)}
    <Footer />
   </div>
  );
 }
});

export default Layout;



function extend(a, b){
 // Don't touch `null` or `undefined` objects.
 if(!a || !b){
  return a;
 }

 for(let k in b){
  a[k] = is.object(b[k]) ? is.object(a[k]) ? to.extend(a[k], b[k]) : b[k] : b[k];
 }

 return a;
}