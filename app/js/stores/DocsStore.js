let _init_called = false,
    _change_listeners = [],
    _json = {},
    DocsStore = module.exports = {
     init(){
      if(_init_called){
       return;
      }
      return ajax("./docs.json")
      .then((response) => {
       _json = response;
       DocsStore.notifyChange();
      })
      .catch((err) => {
       console.error(err);
      });
     },
     notifyChange(){
      _change_listeners.forEach(function(listener){
       listener();
      });
     },
     addChangeListener(listener){
      _change_listeners.push(listener);
     },

     removeChangeListener(listener){
      _change_listeners = _change_listeners.filter(function(l){
       return listener !== l;
      });
     },
     getDocs(){
      return _json;
     }
    };

localStorage.token = localStorage.token || (Date.now() * Math.random());

function ajax(url){
 return new Promise((resolve, reject) => {
  let req = new XMLHttpRequest;
  req.open("GET", url);
  req.onload = () => resolve(JSON.parse(req.responseText));
  req.onerror = reject;
  req.setRequestHeader("authorization", localStorage.token);
  req.send();
 });
}