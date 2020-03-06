const app = require('./lib/app');
// eslint-disable-next-line no-process-env
const port = process.env.PORT || 4000;
app.listen(port);
// eslint-disable-next-line no-console
console.log(`server started listening on port : ${port}`);
