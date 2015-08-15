var TreeNode = React.createClass({
  getInitialState(){
    return {
      visible: true
    };
  },
  toggle(){
    this.setState({
     visible: !this.state.visible
    });
  },
  render(){
    var childNodes;
    if (this.props.node.childNodes != null) {
      childNodes = this.props.node.childNodes.map((node, index) => <li key={index}><TreeNode node={node} /></li>);
    }

    var style = {};
    if (!this.state.visible) {
      style.display = "none";
    }

    return (
      <div>
        <h5 onClick={this.toggle}>
          {this.props.node.title}
        </h5>
        <ul style={style}>
          {childNodes}
        </ul>
      </div>
    );
  }
});

var tree = {
  title: "howdy",
  childNodes: [
    {title: "bobby"},
    {title: "suzie", childNodes: [
      {title: "puppy", childNodes: [
        {title: "dog house"}
      ]},
      {title: "cherry tree"}
    ]}
  ]
};

React.render(
 <TreeNode node={tree} />,
 document.getElementById("tree")
);