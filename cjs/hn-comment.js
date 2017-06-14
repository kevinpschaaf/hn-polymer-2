'use strict';

require('./polymer.js');

class HnComment extends Polymer.Element {
  static get template() {
    return `<style>
      :host {
        display: block;
      }

      a {
        color: currentColor;
      }

      .header {
        padding: 8px 0;
      }

      .header > * {
        margin-right: .25rem;
        color: var(--detail-font-color);
      }

      .toggle {
        user-select: none;
        background-color: transparent;
        border: none;
        padding: 0;
      }

      .comment {
        border-bottom: var(--separator-border);
      }

      .comment > p {
        overflow-wrap: break-word;
      }

      .comment pre {
        white-space: pre-line;
      }

      .comment > p:first-of-type {
        margin-top: 0;
      }

      .comments {
        padding-left: 8px;
      }
    </style>
    <div class="header">
      <button class="toggle" on-click="_toggleCollapse" aria-label$="[[_collapseTitle]]">[[_collapseString]]</button>
      <a href$="/user/[[comment.user]]">[[comment.user]]</a>
      <a href$="/item/[[comment.id]]">[[comment.time_ago]]</a>
    </div>
    <div class="comment" inner-h-t-m-l="[[comment.content]]" hidden$="[[collapsed]]"></div>
    <div class="comments" hidden$="[[collapsed]]">
      <template is="dom-repeat" items="[[comment.comments]]" initial-count="3">
        <hn-comment comment="[[item]]"></hn-comment>
      </template>
    </div>`;
  }
  constructor() {
    super();
    this.collapsed = false;
    this._collapseString = '[\u2013]';
    this._collapseTitle = 'Hide comments';
    this._commentThreadSize = 0;
  }
  _calculateThreadSize(comment) {
    let threadSize = 0;
    let flat = comment => {
      threadSize++;
      comment.comments.forEach(flat);
    };
    flat(comment);
    return threadSize;
  }
  _toggleCollapse() {
    this.collapsed = !this.collapsed;
    if (!this._commentThreadSize) {
      this._commentThreadSize = this._calculateThreadSize(this.comment);
    }
    this._collapseString = this.collapsed ? `[+${this._commentThreadSize}]` : '[\u2013]';
    this._collapseTitle = `${this.collapsed ? 'Show' : 'Hide'} ${this._commentThreadSize} comments`;
  }
} // import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';

customElements.define('hn-comment', HnComment);

