import { Link } from "react-router-component";

let View = React.createClass({
 render(){
  var links = [1, 2, 3, 4, 5].map((item) =>
   <li key={item}><Link href={`/${item}`}>Item {item}</Link></li>
  );
  return (
   <div id="s-content" class="s-content">
    <ul>{
     links
    }</ul>
   </div>
  );
 }
});

export default View;