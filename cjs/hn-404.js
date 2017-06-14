'use strict';

require('./polymer.js');

class Hn404 extends Polymer.Element {
  static get template() {
    return `<style>
      :host {
        display: block;
        padding: 10px 20px;
        text-align: center;
        color: var(--detail-font-color);
        font-size: var(--detail-font-size);
      }

      a {
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        color: var(--detail-font-color);
        border: 2px solid var(--detail-font-color);
        padding: 8px;
        margin: 16px;
      }
    </style>
    <div>Oops you hit a 404.</div>
    <a href="/">Head back to home...</a>`;
  }
} // import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';

window.customElements.define('hn-404', Hn404);

