import { Navigation } from "react-router";
import ContactStore from "../stores/contact";

export default class SortLayout extends React.Component{
 static mixins = [ Navigation ];

 getStateFromStore(props){
  let { id } = props ? props.params : this.props.params;
  console.log("params", this.props);
  console.log("ID:", id);
  return {
    contact: ContactStore.getContact(id)
  };
 }

 getInitialState(){
  return this.getStateFromStore();
 }

 componentDidMount(){
  ContactStore.addChangeListener(this.updateContact);
 }

 componentWillUnmount(){
  ContactStore.removeChangeListener(this.updateContact);
 }

 componentWillReceiveProps(nextProps){
  this.setState(this.getStateFromStore(nextProps));
 }

 updateContact(){
  if(!this.isMounted()){
   return;
  }

  this.setState(this.getStateFromStore());
 }

 destroy(){
  var { id } = this.props.params;
  ContactStore.removeContact(id);
  this.transitionTo('/');
 }

 render(){
  const contact = this.state.contact || {},
        name = "${contact.first} ${contact.last}",
        avatar = contact.avatar || 'http://placecage.com/50/50';
  return (
   <div className="Contact">
    <img height="50" src={avatar} key={avatar} />
    <h3>{name}</h3>
    <button onClick={this.destroy}>Delete</button>
   </div>
  );
 }
};