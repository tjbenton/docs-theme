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


export default function Router(){
 "use strict";
 var routes = [];
 function addRoute(route, handler){
  routes.push({
   parts: route.split("/"),
   handler: handler
  });
 }

 function load(route){
  window.location.hash = route;
 }

 function start(){
  var path = window.location.hash.substr(1),
      parts = path.split("/"),
      parts_length = parts.length;
  console.log(window.location);
  for(var i = 0; i < routes.length; i++){
   var route = routes[i];
   if(route.parts.length === parts_length){
    var params = [];
    for(var j = 0; j < parts_length; j++){
     if(route.parts[j].substr(0, 1) === ":"){
      params.push(parts[j]);
     }
     else if(route.parts[j] !== parts[j]){
      break;
     }
    }
    if(j === parts_length){
     route.handler.apply(undefined, params);
     return;
    }
   }
  }
 }

 window.onhashchange = start;

 return {
  addRoute,
  load,
  start
 };
};