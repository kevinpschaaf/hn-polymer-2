'use strict';

require('./polymer.js');

class HnOffline extends Polymer.Element {
  static get is() {
    return `<style>
      :host {
        display: block;
        padding: 10px 20px;
        text-align: center;
        color: var(--detail-font-color);
        font-size: var(--detail-font-size);
      }

      button {
        cursor: pointer;
        color: var(--detail-font-color);
        border: 2px solid var(--detail-font-color);
        padding: 8px;
        margin: 16px;
        background-color: transparent;
      }
    </style>
    <div>Yo, you are offline and this resource is unavailable.</div>
    <button on-click="_requestRefresh">Try Again...</button>`;
  }
  constructor() {
    super();
    window.addEventListener('online', e => this._requestRefresh());
  }
  _requestRefresh() {
    this.dispatchEvent(new Event('refresh'));
  }
} // import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';

window.customElements.define('hn-offline', HnOffline);

