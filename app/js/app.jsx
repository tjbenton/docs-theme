
import "babel-core/polyfill";
import Router, { DefaultRoute, Link, Route, RouteHandler } from "react-router";
import home from "./pages/home";
import layout from "./pages/layout";
import SortLayout from "./components/sort-layout";

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
 contextTypes: {
  router: React.PropTypes.func
 },

 getHandlerKey(){
  // console.dir(Route);
  var childDepth = 1; // assuming App is top-level route
  var { router } = this.context;
  // console.log("router.getCurrentParams:", router.getCurrentParams());
  // console.log("router.getCurrentRoutes:", router.getCurrentRoutes()[0]);
  // var key = router.getCurrentRoutes()[childDepth].name;
  // var id = router.getCurrentParams().id;
  // if (id) { key += id; }

  return "home";
  // return key;
 },
 render(){
  return (
   <div>
    fuck your shit
    <header className="s-header">
     <nav>
      <Link to="page" params={{splat: "home/fuck/me"}}>Home</Link>
     </nav>
    </header>
    <main id="view" className="s-view">
     <RouteHandler key={this.getHandlerKey()} />
    </main>
   </div>
  );
 }
});


var Page = React.createClass({
 contextTypes: {
  router: React.PropTypes.func
 },

 getHandlerKey(){
  var childDepth = 1; // assuming App is top-level route
  var { router } = this.context;
  console.log("router.getCurrentParams:", router.getCurrentParams());
  console.log("router.getCurrentRoutes:", router.getCurrentRoutes()[0]);
  // var key = router.getCurrentRoutes()[childDepth].name;
  // var id = router.getCurrentParams().id;
  // if (id) { key += id; }

  return (
   "NO NO FUCK YOU"
  );
  // return key;
 },

 render(){
  return (
   <div>All the things yo {this.getHandlerKey()}</div>
  )
 }
});


// let routes = (
//  <Route name="app" key="app" path="/" handler={App}>
//   <Route name="test" key="layout" path="/:fuck" handler={test} />
//   <Route name="layout" key="layout" path="/layout" handler={layout} />
//   <Route name="sort-layout" key="sort-layout" path="/sort-layout/:contact" handler={SortLayout} />
//   <DefaultRoute name="home" key="home" handler={home}/>
//  </Route>
// );
//
// let routes = (
//  <Route name="app" key="app" path="/" handler={App}>
//   <Route name="page" key="page" path="/*" handler={Page} />
//  </Route>
// );

// Router.run(routes, Router.HistoryLocation, function(Handler, state){
//  console.log("");console.log("");console.log("start ----------------------------------------------------------------------------");
//  console.log(state);
//  React.render(<Handler params={state.params}/>, document.body);
// });


// class Hello extends React.Component{
//  render(){
//   router.load(this.props.name)
//   return (
//    <a href="#d/test">Hello {this.props.name}</a>
//   );
//  }
// }
//
// class Main extends React.Component{
//  render() {
//   return <Hello name={this.props.name} />;
//  }
// }
//
// router.addRoute("", function(){
//  React.render(<Main name="World" />, document.body);
// });
//
// router.addRoute("d/:id", function(id) {
//  React.render(<Main name="Earth" />, document.body);
// });
//
// router.start();


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