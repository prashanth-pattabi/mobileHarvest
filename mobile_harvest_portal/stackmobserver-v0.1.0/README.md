stackmob-web-server
========================

This server is used for running HTML5 StackMob applications ocally on your computer for development purposes. It functions as a conditional proxy server. Resource files like static html, images, css, etc. are served as a normal http server.  Requests originating from the StackMob JavaScript SDK contain a special HTTP Header that tells this web server to forward requests to the StackMob API Server.

# Usage
You'll need to initialize `StackMob.init({ ... })` with your application's information.  Some of these examples also need specific schemas and relationships set up.  These will be described in the example pages and respective READMEs.

First, <a href="https://stackmob.com/platform/help/tutorials/html5_js_sdk" target="_blank">initialize Stackmob</a> within each example file (index.html, api/examples.html, etc. below).

You should then run the StackMob Local Development Server from the root folder.  In your terminal/command prompt, run:

		>  cd /mycomputer/path/to/stackmob-javascript-examples/
		
Then on Mac/Linux, run:

		>  python stackmobserver.py

Or on Windows:

		>  stackmobserver.py		
		