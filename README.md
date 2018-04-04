# QuinceAngular

## Used technologies

 * Angular
 * Angular CLI
 * ngrx
 * RxJS
 * Bootstrap
 * PrimeNG (for the table and the modal)
 * Font Awesome

## Notes

 * The app is using a service that mocks the backend.

## Development mode

To run the app in development mode, first you need to install the required packages:

`npm install`

Then you can start the application:

`npm start`

If you are using the default settings, navigate to `http://localhost:4200/`.

## Production mode

To build the application, you have to use (after `npm install`):

`npm run build`

After this, the files that you need will be in the `dist` folder. Simply copy all of these files to a server, or you can use a command-line server in `dist`:

`http-server`

You have to install this package first globally: `npm install http-server -g`