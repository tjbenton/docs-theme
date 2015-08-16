import Link from "../router";
let _Nav = React.createClass({
 getInitialState(){
  return {
   focused: 0
  };
 },
 clicked(index){
  // The click handler will update the state with
  // the index of the focused menu entry
  this.setState({
   focused: index
  });
 },
 render(){
  return (
   <nav>
    <ul>{
     this.props.items.map((item, index) => {
      var style = "";
      if(this.state.focused === index){
       style = "focused";
      }
      // Notice the use of the bind() method. It makes the// index available to the clicked function:
      return (
       <li className={style} key={index} onClick={this.clicked.bind(this, index)}>{item}</li>
      );
     })
    }</ul>
    <p>Selected: {this.props.items[this.state.focused]}</p>
   </nav>
  );
 }
});

export default _Nav;