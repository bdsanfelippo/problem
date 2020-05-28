import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const app = express();

// serve everything in the public folder as static files
app.use(express.static("public"));

const webpackConfig = require("../../webpack.config");

// add "webpack-hot-middleware/client" to start of array
// this is done here so that the library can be run through webpack on its own
// without dependency on the standalone library
webpackConfig.entry.unshift("webpack-hot-middleware/client");

const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);
app.use(
  webpackHotMiddleware(compiler, {
    path: "/__webpack_hmr",
  })
);

const libraryPath = path.join(__dirname, "../../lib");
app.use("/library", express.static(libraryPath));

app.get("/", (req, res) => {
  res.sendFile(__dirname, "index.html");
});

app.listen(4141, () => {
  console.log("Listening on port 4141");
});
