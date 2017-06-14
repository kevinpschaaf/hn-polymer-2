'use strict';

require('./polymer.js');

class HnListItem extends Polymer.Element {
  static get template() {
    return `<style>
      :host {
        display: block;
      }

      a {
        pointer: cursor;
        color: black;
      }

      .title {
        flex: 1;
        padding-left: 1rem;
      }

      .title > a {
        text-decoration: none;
      }

      .index {
        font-weight: bold;
        color: var(--detail-font-color);
        align-self: center;
        min-width: 1em;
        text-align: right;
      }

      .info, .domain {
        color: var(--detail-font-color);
      }

      .domain {
        padding-left: 4px;
        word-break: break-all;
      }

      .info {
        font-size: var(--detail-font-size);
        padding-top: 8px;
      }

      .info > a {
        color: var(--detail-font-color);
      }

      .spacer {
        padding-right: .5em;
      }
    </style>
    <span class="index">[[index]]</span>
    <div class="title">
      <a href="[[item.url]]">[[item.title]]</a>
      <span class="domain">([[item.domain]])</span>
      <div class="info">
        [[item.points]] points by
        <a href="/user/[[item.user]]">[[item.user]]</a>
        [[item.time_ago]]
        <span class="spacer">|</span>
        <a href="/item/[[item.id]]">[[item.comments_count]] comments</a>
      </div>
    </div>`;
  }
} // import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';

window.customElements.define('hn-list-item', HnListItem);

