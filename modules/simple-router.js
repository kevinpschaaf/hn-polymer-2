// import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
import './polymer.js';
class SimpleRouter extends Polymer.Element {
  static get properties() {
    return {
      path: {
        notify: true,
        computed: '_computePath(location)'
      }
    };
  }
  ready() {
    super.ready();
    document.body.addEventListener('click', e => this._handleClick(e));
    window.addEventListener('popstate', () => this._handleUrlChange());
    this._handleUrlChange();
  }
  _handleClick(e) {
    if (e.button !== 0 || // Left click only
      (e.metaKey || e.ctrlKey)) {
      // No modifiers
      return;
    }
    let origin;
    if (window.location.origin) {
      origin = window.location.origin;
    } else {
      origin = window.location.protocol + '//' + window.location.host;
    }
    let anchor = e.composedPath().filter(n => n.localName == 'a')[0];
    if (anchor && anchor.href.indexOf(origin) === 0) {
      e.preventDefault();
      window.history.pushState({}, '', anchor.href);
      this._handleUrlChange();
    }
  }
  _handleUrlChange() {
    this.location = window.location.href;
  }
  _computePath(location) {
    return window.decodeURIComponent(window.location.pathname).slice(1).split('/');
  }
}
customElements.define('simple-router', SimpleRouter);
