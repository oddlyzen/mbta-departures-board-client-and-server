# MBTA Departure Board Client and Server Applications
![App Screenshot](/images/shot.png | width=300)
This is a Node.js application to accomplish the given task of displaying
departures from the North and South Stations. The server application consumes
the CSV file from the MBTA development server and serves it up in real-time via
a socket connection to the client app. The client is a small React application
that displays the departure status of MBTA trains in a Bootstrap-styled table.

## Running the Server

From within the `mbta-departure-board` directory, run `node server.js`. This
will start the server. If all goes well, you will see the message `Listening on
port 4001`. When a client app connects to the server, it will  display `New
client connected`.

## Starting the Client App

From within the `mbta-departure-board-client` directory, start the React app
by running `npm start`. A browser window will open and first display a loading
message and progress indicator (non-functional, just for looks) and then show
the MBTA train departures in a table.

### Contact Information
If you have any questions, feel free to contact me:

Mark Coates (@oddlyzen)
