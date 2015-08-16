import { Link } from "react-router-component";
import Header from "./header";
import Footer from "./footer";
import View from "./view";

var Detail = React.createClass({
 render: function(){
  return (
   <div>
    <p>Detailed info for item: {this.props.item}</p>
   </div>
  );
 }
});

export default class Layout extends React.Component{
 render(){
  return (
   <div>
     <Header />
     <View />
     {this.props.item && <Detail item={this.props.item} />}
     <Footer />
   </div>
  );
 };
};