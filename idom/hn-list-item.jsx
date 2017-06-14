/** @jsx h */
// import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
// import './polymer.js';
import {h, RenderIdom} from './render-idom/render-idom.js';
class HnListItem extends RenderIdom(HTMLElement) {
  static get observedAttributes() { return ['index', 'item']; }
  render() {
    let style = `
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
      }`;
    return (
      <root>
        <style>{style}</style>
        <span class$="index">{this.index}</span>
        <div class$="title">
          <a href={this.item.url}>{this.item.title}</a>
          <span class$="domain">({this.item.domain})</span>
          <div class$="info">
            {this.item.points} points by <a href={`/user/${this.item.user}`}>{this.item.user}</a> {this.item.time_ago}
            <span class$="spacer">|</span>
            <a href={`/item/${this.item.id}`}>{this.item.comments_count} comments</a>
          </div>
        </div>
      </root>
    );
  }
}
HnListItem.createPropertiesForAttributes();
window.customElements.define('hn-list-item', HnListItem);
