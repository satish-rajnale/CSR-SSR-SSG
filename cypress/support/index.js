// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// const { GoogleSocialLogin } = require("cypress-social-logins").plugins;

// module.exports = (on, config) => {
//   on("task", {
//     GoogleSocialLogin: GoogleSocialLogin,
//   });
// };
// const { baseLoginConnect } = require("cypress-social-logins").plugins;

// module.exports = (on, config) => {
//   on("Login", {
//     customLogin(options) {
//       async function typeUsername({ page, options } = {}) {
//         await page.waitForSelector('input[id="username"]');
//         await page.type('input[id="username"]', options.username);
//       }

//       async function typePassword({ page, options } = {}) {
//         await page.waitForSelector('input[id="password"]');
//         await page.type('input[id="password"]', options.password);
//         await page.click('button[id="_submit"]');
//       }

//       return baseLoginConnect(typeUsername, typePassword, null, options);
//     },
//   });
// };
