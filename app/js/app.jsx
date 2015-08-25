require("../stylus/docs-theme");
import "babel-core/polyfill";
import Router, {Locations, Location, Link} from "react-router-component";
import Home from "./pages/home";
import PageLayout from "./pages/layout";
import Search from "./pages/search";

let App = React.createClass({
 render: function(){
  return (
   <div>
    <Locations hash>
     <Location path="/" handler={<Home />} />
     <Location path="/:page" handler={<Switch />} />
     <Location path="/:page/*" handler={<Switch />} />
    </Locations>
   </div>
  );
 }
});

let Switch = React.createClass({
 render(){
  return this.props.page !== "search" ? <PageLayout params={this.props._} /> : <Search />;
 }
});

React.render(<App />, document.body);