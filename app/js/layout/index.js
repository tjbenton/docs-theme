import { Link } from "react-router-component";
import Header from "./header";
import Footer from "./footer";
import View from "./view";
import DocsStore from "../stores/DocsStore";


var Detail = React.createClass({
 render: function(){
  return (
   <div>
    <p>Detailed info for item: {this.props.item}</p>
   </div>
  );
 }
});

let Layout = React.createClass({
 getInitialState(){
  return {
   data: DocsStore.getDocs(),
   nav: "",
   pages: "",
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
  console.log(DocsStore.getDocs());
  this.setState({
   data: DocsStore.getDocs(),
   loading: false
  });
 },

 render(){
  return (
   <div>
     <Header />
     <View />
     {this.props.item && <Detail item={this.props.item} />}
     <Footer />
   </div>
  );
 }
});

export default Layout;