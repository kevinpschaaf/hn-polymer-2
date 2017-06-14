const {serialize, ssrify} = require('../wc-ssr/ssr.js');
const { HnApp } = require('./cjs/hn-app.js');
require('./cjs/hn-list.js');

// let app = new HnApp();
// document.body.appendChild(app);
// Polymer.flush();
// console.log(serialize(app));

ssrify('index-modules.html', 'http://127.0.0.1:8081/').then(console.log);