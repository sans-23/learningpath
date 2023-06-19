const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser);
app.use(bodyParser.json());

module.exports = app;