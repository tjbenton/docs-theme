var webpack = require("webpack"),
    path = require("path");
// require("expose?libraryName!./app.js");
module.exports = {
 entry: [
  "webpack/hot/dev-server",
  "webpack-dev-server/client?http://localhost:8080/",
  "webpack-dev-server/client?http://localhost:8080/webpack-dev-server/",
  // "webpack-dev-server/client?http://localhost:3000",
  "./app/js/app.jsx",
 ],
 output: {
  path: path.join(__dirname, "build"),
  publicPath: "/",
  filename: "app.js"
 },
 devtool: "source-map",
 module: {
  loaders: [
   {
    test: /\.js(x)?$/,
    exclude: /(node_modules|bower_components)/,
    loaders: ["react-hot", "babel?optional[]=runtime&stage=0"]
   },
   {
    test: /\.(jpe?g|gif|png|ico|svg|woff|ttf)$/,
    loader: "file-loader?name=[path][name].[ext]"
   },
   {
    test: /\.styl$/,
    loader: "css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/"
   },
   {
    test: /\.css$/,
    exclude: /(node_modules|bower_components)/,
    loader: "style!css"
   },
   {
    test: require.resolve("react"), // allows react dev tools to work
    loader: "expose?React"
   }
  ]
 },
 plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ProvidePlugin({
   React: "react/addons",
  }),
  // new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])),
  new webpack.optimize.LimitChunkCountPlugin({
   maxChunks: 50
  }),
  new webpack.optimize.DedupePlugin(),
  // new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoErrorsPlugin(),
 ],
 resolve: {
  // all these extensions will be resolved without specifying extension in the `require` function
  extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".styl"],
  // files in these directory can be required without a relative path
  modulesDirectories: [
   "node_modules",
   "bower_components"
  ]
 },
 node: {
  fs: "empty",
  __filename: true
 }
};