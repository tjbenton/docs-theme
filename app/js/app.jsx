
import "babel-core/polyfill";
import Router, {Locations, Location, Link} from "react-router-component";
import Layout from "./layout";
// import Home from "./pages/home";
// import layout from "./pages/layout";
// import SortLayout from "./components/sort-layout";

// class App extends React.Component{
//  render(){
//   return (
//    <div>
//     <header className="s-header">
//      <nav>
//       <Link to="home">Home</Link>
//       <Link to="layout">Layout</Link>
//       <Link to="sort-layout">SortLayout</Link>
//       <Link to="shit">Shit</Link>
//      </nav>
//     </header>
//     <main id="view" className="s-view">
//      <RouteHandler />
//     </main>
//    </div>
//   );
//  }
// }

var App = React.createClass({
 render: function(){
  return (
   <div>
    <Locations hash>
     <Location path="/" handler={Layout} />
     <Location path="/:item" handler={Layout} />
    </Locations>
    <h1>Master-detail with react-router-component</h1>
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