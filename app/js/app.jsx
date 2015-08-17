
import "babel-core/polyfill";
import Router, {Locations, Location, Link} from "react-router-component";
import Layout from "./layout";

var App = React.createClass({
 render: function(){
  return (
   <div>
    <Locations hash>
     <Location path="/" handler={Layout} />
     <Location path="/:item" handler={Layout} />
    </Locations>
   </div>
  );
 }
});

React.render(<App />, document.body);















// var request = new XMLHttpRequest();
// request.open("GET", "/my/url", true);
//
// request.onload = function(){
//   if(request.status >= 200 && request.status < 400){
//    // Success!
//    var data = JSON.parse(request.responseText);
//   }else{
//    // We reached our target server, but it returned an error
//   }
// };
//
// request.send();