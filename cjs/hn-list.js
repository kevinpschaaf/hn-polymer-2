'use strict';

require('./polymer.js');

require('./hn-list-item.js');

// import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
// import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
class HnList extends Polymer.Element {
  static get template() {
    return `<style>
      :host {
        display: block;
      }

      a {
        color: currentColor;
      }

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      hn-list-item:first-of-type {
        padding-top: 0;
      }

      hn-list-item {
        display: flex;
        padding: 8px 0;
        border-bottom: var(--separator-border);
        overflow-wrap: break-word;
      }

      .forwardback {
        padding-top: 16px;
        display: flex;
      }

      .forwardback > a {
        text-decoration: none;
      }

      .forwardback > span {
        flex: 1;
        text-align: center;
      }
    </style>
    <ul>
      <template is="dom-repeat" items="[[list]]" initial-count="10">
        <hn-list-item item="[[item]]" index="[[_computeIndex(pageSize, page, index)]]"></hn-list-item>
      </template>
    </ul>

    <div class="forwardback">
      <a class="prev" href="/[[type]]/[[_computePrevPage(page)]]" aria-label="Previous Page">◀ Previous</a>
      <span>Page [[page]]</span>
      <a class="next" href="/[[type]]/[[_computeNextPage(page)]]" aria-label="Next Page">Next ▶</a>
    </div>`;
  }
  static get properties() {
    return { pageSize: Number };
  }
  _computeNextPage(page) {
    return parseInt(page || 1) + 1;
  }
  _computePrevPage(page) {
    return parseInt(page || 2) - 1 || 1;
  }
  _computeIndex(pageSize, page, index) {
    return pageSize * (page - 1) + index + 1;
  }
}
window.customElements.define('hn-list', HnList);

