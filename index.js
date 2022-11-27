"use strict";

// interface CamundaEntryFile {
//     name: string;
//     menu: string;
//     style: string;
//     script: string;
// }

module.exports = {
    name: "Metrics-Plugin",
    menu: "./menu/menu.js",
    // had to change it to import the new stuff
    style: "./dist/main.css",
    script: "./dist/client.js",
};
