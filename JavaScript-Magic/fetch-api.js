// The Fetch API in JavaScript is a simple interface for fetching resources over the internet. 
// Fetch makes it easier for us to make web requests and handle the responses.
// This feature is built as a Promise-based JavaScript API for making asynchronous HTTP requests in the same way as the old XMLHttpRequest (XHR). 
// Fetch is a simple and powerful way to fetch resources from a server. 

const fetch = require("node-fetch"); // using the node fetch that we installed before

fetch("https://type.fit/api/quotes")
   .then((response) => response.json()) // Get the response .JSON
   .then((data) => console.log(data[Math.random() * 1000])) // Print the data with the Math.random() function to fetch quotes randomly

// It ended with an rror message that states:
// UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). 
// To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
// (node:5480) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
