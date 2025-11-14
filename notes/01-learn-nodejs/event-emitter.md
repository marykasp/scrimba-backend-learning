# Event Emitter

Event is a signal that something has happened

- user clics a button
- file finishes downloading
- a network request is received

`EventEmitter` - emit a named event, handled by listener functions

```js
import { EventEmitter } from "node:events";

const customerDetails = {
  fullName: "Meryl Sheep",
  email: "baah@thedevilwearswool.com",
  phone: 12345689,
};

// create the emitter
const emailRequestEmitter = new EventEmitter();

// define the listener function
function generateEmail(customer) {
  console.log(`email generated for ${customer.email}`);
}

// register the listener - on hearing this event call this function
emailRequestEmitter.on("emailRequest", generateEmail);

// call the emitter - emit the event
emailRequestEmitter.emit("emailRequest", customerDetails);
```

Challenge 1: Add an Event Emitter

- create and export a new instance of EventEmitter
- Register the listner function when an event called sighting-added is detected

```js
// File is called SightingEvent.js
export const sightingEvents = new EventEmitter();

// create a listener function
export function createAlert(sighting) {
  console.log(`Send alert to Ghost Hunters in ${sighting.location}`);
}

sightingEvents.on("sighting-added", createAlert);
```

Challenge 2: Use the registered eventEmitter to emit a sighting added in the handlePost route handler

```js
import { sightingEvents } from "../events/SightingEvent.js";

// get the parsedJSONBody from the request
// sanitize the html
// add it the backend JSON - use fs.writeFile to write the new sighting
sightingEvents.emit("sighting-added", sanitizedBody);
```
