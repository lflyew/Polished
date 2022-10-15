// Entry Point for controllers ROUTERS
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use('', homeRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;


// const express = require('express');
// //Loads the handlebars module
// const handlebars = require('express-handlebars');
// const app = express();
// const port = 3000;
// //Sets our app to use the handlebars engine
// app.set('view engine', 'handlebars');
// //Sets handlebars configurations (we will go through them later on)
// app.engine('handlebars', handlebars.engine({
// layoutsDir: __dirname + '/views/layouts',
// }));
// app.use(express.static('public'))
// app.get('/', (req, res) => {
// //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
// res.render('login', {layout : 'index'});
// });
// app.use(express.static("images"))
// app.get("/", (req, res) => {
//     res.render("login", {layout : 'index'});
// });
// app.listen(port, () => console.log(`App listening to port ${port}`));