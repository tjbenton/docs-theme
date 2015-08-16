// import Layout from "./components/layout";
// import HomePage from "./components/homepage";
// const router = new Router(on => {
//  on("*", async (state, next) => { // Matches all URLs
//   console.log("state:", state);
//   const component = await next(); // and wraps child components
//   return <layout>{component}</layout>; // into a common layout component
//  });
//
//  on("/", () => <HomePage />);
// });
// export default router;

const router = (function(){
 "use strict";

 var routes = [],
     _default;

 function add(route, handler){

  routes.push({
   parts: route.split("/").filter(Boolean),
   handler: handler
  });
 }

 function load(route){
  window.location.hash = route;
 }

 function fallback(callback){
  _default = callback;
 }

 function run(){
  var path = window.location.hash.substr(1),
      parts = path.split("/").filter(Boolean),
      parts_length = parts.length;

  for(var i = 0; i < routes.length; i++){
   var route = routes[i];
   if(route.parts.length === parts_length){
    var params = [];
    for(var j = 0; j < parts_length; j++){
     if(route.parts[j].substr(0, 1) === ":"){
      params.push(parts[j]);
     }else if(route.parts[j] !== parts[j]){
      break;
     }
    }
    if(j === parts_length){
     route.handler.apply(undefined, params);
     return;
    }
   }
  }

  _default(parts);
 }


 return {
  add,
  load,
  run,
  fallback
 };
}());

export default router;


window.onhashchange = function(){
 router.run();
};


export class Link extends React.Component{
 href(){
  if(this.props.href.substr(0, 2) === "#/"){
   return this.props.href;
  }else{
   return `#/${this.props.href}`.replace("//", "/");
  }
 };
 render(){
  return (
   <a href={this.href()}>{this.props.children}</a>
  );
 }
}