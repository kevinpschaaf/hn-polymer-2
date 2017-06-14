/** @jsx h */
// import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
// import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import './polymer.js';
import './hn-list-item.js';
import { h, RenderIdom } from './render-idom/render-idom.js';
class HnList extends RenderIdom(HTMLElement) {
  static get observedAttributes() {
    return ['page-size', 'page', 'list', 'type'];
  }
  render() {
    let style = `
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
      }`;
    return h(
      'root',
      null,
      h(
        'style',
        null,
        style
      ),
      h(
        'ul',
        null,
        this.list && this.list.map((item, index) => h('hn-list-item', { item: item, index: this._computeIndex(this.pageSize, this.page, index) }))
      ),
      h(
        'div',
        { class$: 'forwardback' },
        h(
          'a',
          { class$: 'prev', href: `/${this.type}/${this._computePrevPage(this.page)}`, 'aria-label': 'Previous Page' },
          '\u25C0 Previous'
        ),
        h(
          'span',
          null,
          'Page ',
          this.page
        ),
        h(
          'a',
          { class$: 'next', href: `/${this.type}/${this._computeNextPage(this.page)}`, 'aria-label': 'Next Page' },
          'Next \u25B6'
        )
      )
    );
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
HnList.createPropertiesForAttributes();
window.customElements.define('hn-list', HnList);

