const port = 8090
const connect = require('connect')
const serveStatic = require('serve-static')
const chalk = require('chalk')
const app = connect()

app.use(
  '/pixel-art/',
  serveStatic('./dist', {
    index: ['index.html', '/']
  })
)

app.listen(port, function () {
  console.log(chalk.green(`> Preview at  http://localhost:${port}/pixel-art/`))
})
