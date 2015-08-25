let Search = React.createClass({
 propTypes: {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  caseSensitive: React.PropTypes.bool,
  throttle: React.PropTypes.number,
  filterKeys: React.PropTypes.oneOf([
   React.PropTypes.string,
   React.PropTypes.arrayOf(React.PropTypes.string)
  ]),
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string
 },

 getDefaultProps(){
  return {
   className: "",
   onChange(){},
   caseSensitive: false,
   throttle: 200,
   placeholder: "Search"
  };
 },

 getInitialState(){
  return {
   searchTerm: this.props.value || ""
  };
 },

 componentWillReceiveProps(next_props){
  if(next_props.value && next_props.value !== this.props.value){
   var e = {
    target: {
     value: next_props.value
    }
   };
   this.update_search(e);
  }
 },

 render(){
  return (
   <div className="search-input ${this.props.className}">
    <div className="search-wrapper">
     <span className="search-icon">{String.fromCharCode(9906)}</span>
     <input type="search" className="search-field" onChange={this.update_search} value={this.state.searchTerm} placeholder={this.props.placeholder} />
    </div>
   </div>
   //  React.createElement("div", {
   //   className: "search-input " + this.props.className
   //  },
   //   React.createElement("div", {
   //    className: "search-wrapper"
   //   },
   //    React.createElement("span", {
   //     className: "search-icon"
   //    }, String.fromCharCode(9906)),
   //    React.createElement("input", {
   //     type: "search",
   //     value: this.state.searchTerm,
   //     onChange: this.update_search,
   //     className: "search-field",
   //     placeholder: this.props.placeholder
   //    })
   //  )
   // );
  );
 },

 update_search(e){
  var searchTerm = e.target.value;
  this.setState({
   searchTerm: searchTerm
  }, function(){
   if(this._throttleTimeout){
    clearTimeout(this._throttleTimeout);
   }

   this._throttleTimeout = setTimeout(this.props.onChange, this.props.throttle, searchTerm);
  }.bind(this));
 },

 filter(keys){
  return Search.filter(this.state.searchTerm, keys || this.props.filterKeys, this.props.caseSensitive);
 },

 statics: {
  filter(term, keys, caseSensitive){
   return (item) => {
    if(term === ""){
     return true;
    }

    if(!caseSensitive){
     term = term.toLowerCase();
    }

    let terms = term.split(" "),
        found_count = 0;
    if(keys){
     if(typeof keys === "string"){
      keys = [keys];
     }

     terms.forEach(function(term){
      var current_keys; // allow search in specific fields with the syntax `field:search`
      if(term.indexOf(":") > -1){
       var searched_field = term.split(":")[0];
       term = term.split(":")[1];
       current_keys = keys.filter((key) => key.indexOf(searched_field) > -1);
      }else{
       current_keys = keys;
      }

      var found = false;
      for(var i = 0; i < current_keys.length; i++){
       var values = get_values_for_key(current_keys[i], item);
       values.forEach((value) => {
        try{
         if(value && value.search(term) !== -1){
          found = true;
         }
        }catch(e){}
       });

       if(found){
        break;
       }
      }

      if(found){
       found_count++;
      }
     });
    }else{
     terms.forEach((term) => {
      try{
       var string_value = item.toLowerCase();
       if(string_value.search(term) !== -1){
        found_count++;
       }
      }catch(e){}
     });
    }
    return found_count === terms.length;
   };
  }
 }
}),
get_values_for_key = function(key, _item){
 var keys = key.split("."),
     results = [_item];
 keys.forEach((_key) => {
  var tmp = [];
  results.forEach((result) => {
   if(result){
    result instanceof Array ? result.forEach((res) => tmp.push(res[_key])) : tmp.push(result[_key]);
   }
  });
  results = tmp;
 });

 return results.map((result) => typeof result === "string" ? result.toLowerCase() : null);
};


export default Search;

var SearchExample = React.createClass({
 searchUpdated(term){
  this.setState({
   searchTerm: term
  }); // needed to force re-render
 },
 render() {
  var mails = [
   {
    user: {
     name: "Mathieu",
     job: "Software Engineer",
     company: "Enki"
    },
    subject: "Hi!"
   },
   {
    user: {
     name: "foo"
    },
    subject: "bar"
   },
   {
    user: {
     name: "bar"
    },
    subject: "foo"
   }
  ];

  if(this.refs.search){
   var filters = ["user.name", "subject"];
   mails = mails.filter(this.refs.search.filter(filters));
  }

  return (
   <div>
    {this.props}
    <Search ref="search" onChange={this.searchUpdated} />
    {mails.map((mail) => {
     return (
      <div className="mail">
       <span className="from">{mail.user.name}: </span>
       <span className="subject">{mail.subject}</span>
      </div>
     )
    })}
   </div>
  );
 }
});