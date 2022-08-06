import { port, server } from "./app.js";
import createError from 'http-errors';

export function normalizePort(val){
    const port = parseInt(val, 10);

    // if port is Not A Number
    if(isNaN(port)){
        return val
    }

    if(port >= 0){
        return port
    }
    return false
}

    /**
 * Event listener for HTTP server "error" event.
 */

export function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * prints a user-friendly message saying where the server is listening for HTTP connections. 
   */

export function onListening() {
const addr = server.address();
const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
console.log(`Listening on ${bind} , Let's 🔥🔥🔥`);
}

/**
 * @desc - handling 404 0r Not found error
 */
export function handle404(req, res, next){
    // catch 404 and forward to error handler
    next(createError(404));
}

export function basicErrorHandler(err, req, res, next) {
    // Defer to built-in error handler if headersSent
    // See: http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
    return next(err)
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    }
