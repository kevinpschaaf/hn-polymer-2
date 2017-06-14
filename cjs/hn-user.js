'use strict';

require('./polymer.js');

class HnUser extends Polymer.Element {
  static get template() {
    return `<style>
      :host {
        display: block;
        font-size: var(--detail-font-size);
      }

      a {
        color: currentColor;
      }

      .links {
        padding: 8px 0;
      }

      .about {
        overflow-wrap: break-word;
      }

      .about pre {
        white-space: pre-line;
      }
    </style>
    <table>
      <tr>
        <td>User:</td>
        <td>[[user.id]]</td>
      </tr>
      <tr>
        <td>Created:</td>
        <td>[[user.created]]</td>
      </tr>
      <tr>
        <td>Karma:</td>
        <td>[[user.karma]]</td>
      </tr>
    </table>

    <div class="about" hidden$="[[!user.about]]" inner-h-t-m-l="[[user.about]]"></div>
    <div class="links">
      <a href$="[[_hnLink('submitted', user.id)]]">submissions</a>
      |
      <a href$="[[_hnLink('threads', user.id)]]">comments</a>
      |
      <a href$="[[ _hnLink('favorites', user.id)]]">favorites</a>
    </div>`;
  }
  _hnLink(type, id) {
    return `https://news.ycombinator.com/${type}?id=${id}`;
  }
} // import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';

window.customElements.define('hn-user', HnUser);

