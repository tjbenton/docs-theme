var PageSlider = {
 getInitialState(){
  return {
   history: [],
   pages: [],
   animating: false
  }
 },
 componentDidUpdate(){
  let skippedCurrentFrame = false,
      pageEl = this.getDOMNode().lastChild,
      pages = this.state.pages,
      l = pages.length,
      transitionEndHandler = function(){
       pageEl.removeEventListener("webkitTransitionEnd", transitionEndHandler);
       pageEl.removeEventListener("transitionEnd", transitionEndHandler);
       pages.shift();
       this.setState({
        pages: pages
       });
      }.bind(this),
      animate = function(){
       if(!skippedCurrentFrame){
        skippedCurrentFrame = true;
        requestAnimationFrame(animate.bind(this));
       }else if(l > 0){
        pages[l - 1].props.position = "center transition";
        this.setState({
         pages: pages,
         animating: false
        });
        pageEl.addEventListener("webkitTransitionEnd", transitionEndHandler);
        pageEl.addEventListener("transitionEnd", transitionEndHandler);
       }
      };

  if(this.state.animating){
   requestAnimationFrame(animate.bind(this));
  }
 },

 slidePage(page){
  var history = this.state.history,
   pages = this.state.pages,
   l = history.length,
   hash = window.location.hash,
   position = "center";

  if(l === 0){
   history.push(hash);
  }else if(hash === history[l - 2]){
   history.pop();
   position = "left";
  }else{
   history.push(hash);
   position = "right";
  }

  page.props.position = position;
  pages.push(page);

  this.setState({
   history: history,
   pages: pages,
   animating: position !== "center"
  });
 },
 render(){
  return (
   <div className="pageslider-container">{
    this.state.pages
   }</div>
  );
 }
};