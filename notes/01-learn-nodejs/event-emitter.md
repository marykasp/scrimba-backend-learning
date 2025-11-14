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
