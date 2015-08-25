import {PropTypes} from "react";
const SiteNav = React.createClass({
 render() {
  return (
   <nav className="c-nav">
    <TreeView items={this.props.items} defaultCollapsed={true} />
   </nav>
  );
  // {this.props.items.map((node, i) => {
  //  return (
  //   <TreeView key={node.title + "|" + i} title={node.title} defaultCollapsed={false}>
  //    {node.subpages.map((page, si) => {
  //     return (
  //      <TreeView title={page.title} key={page.title + "|" + si} defaultCollapsed={false}>
  //       <div className="info">stuff</div>
  //      </TreeView>
  //     );
  //    })}
  //   </TreeView>
  //  );
  // })}
 },
});

export default SiteNav;

const TreeView = React.createClass({
 propTypes: {
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool
 },
 getInitialState() {
  return {
   collapsed: !this.props.defaultCollapsed
  };
 },
 render(){
  return (
   <ul>
    {this.props.items.map((item, i) => {
     return (
      <TreeNode {...item} defaultCollapsed={this.state.collapsed} />
     )
    })}
   </ul>
  );
 }
});

const TreeNode = React.createClass({
  propTypes: {
   collapsed: PropTypes.bool,
   defaultCollapsed: PropTypes.bool,
   title: PropTypes.node.isRequired,
  },

  getInitialState() {
   return {
    collapsed: !this.props.defaultCollapsed
   };
  },

  handleClick(e) {
   e.preventDefault();
   this.setState({
    collapsed: !this.state.collapsed
   });
   if(this.props.onClick){
    this.props.onClick(...args);
   }
  },

  render() {
   const {
    collapsed = this.state.collapsed,
    title,
    href,
    subpages,
    ...rest,
   } = this.props;

   let className = "tree-view";
   if(collapsed){
    className += " is-open";
   }

   return (
    <li className={className} {...rest}>
     <a href={href} className="tree-view__item" onClick={this.handleClick}>
      {title}
     </a>
     {!!subpages.length && <TreeView items={subpages} defaultCollapsed={false}/>}
    </li>
   );
  },
});