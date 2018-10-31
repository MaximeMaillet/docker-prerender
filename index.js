const puppeteer = require('puppeteer');
const prerender = require('prerender');

const server = prerender({
  chromeFlags: ['--no-sandbox', '--disable-setuid-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars'],
  port: 8080,
  followRedirect: true,
  debug: true,
  chromeLocation: puppeteer.executablePath(),
});

server.start();