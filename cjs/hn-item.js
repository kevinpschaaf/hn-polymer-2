'use strict';

require('./polymer.js');

require('./hn-comment.js');

// import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
class HnItem extends Polymer.Element {
  static get template() {
    return `<style>
      :host {
        display: block;
        font-size: var(--detail-font-size);
      }

      a {
        color: currentColor;
      }

      .title, .domain {
        font-size: 1rem;
      }

      .title {
        text-decoration: none;
      }

      .domain {
        padding-left: 4px;
        color: var(--detail-font-color);
      }

      .spacer {
        padding-right: .5em;
      }

      .meta {
        padding: 8px 0;
        color: var(--detail-font-color);
        border-bottom: var(--separator-border);
      }

      .user {
        color: var(--detail-font-color);
      }
    </style>

    <a class="title" href$="[[item.url]]" hidden="[[item.content]]">[[item.title]]</a>
    <div class="title" hidden="[[!item.content]]">[[item.title]]</div>
    <span class="domain" hidden="[[!item.domain]]">([[item.domain]])</span>
    <div hidden="[[!item.content]]" inner-h-t-m-l="[[item.content]]"></div>
    <div class="meta">
      [[item.points]] points by
      <a class="user" href$="/user/[[item.user]]">[[item.user]]</a>
      [[item.time_ago]]
      <span class="spacer">|</span>
      <span>[[item.comments_count]] comments</span>
    </div>

    <template is="dom-repeat" items="[[item.comments]]" initial-count="5">
      <hn-comment comment=[[item]]></hn-comment>
    </template>`;
  }
}
customElements.define('hn-item', HnItem);

