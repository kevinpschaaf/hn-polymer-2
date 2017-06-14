/** @jsx h */
// import { Element } from '../node_modules/@polymer/polymer/polymer-element.js';
import './polymer.js';
import './simple-router.js';
import { h, RenderIdom } from './render-idom/render-idom.js';
// base fetch url
// url for server proxy to api, when running locally switch url's
// const fetchBaseUrl = '/hn';
const fetchBaseUrl = 'https://node-hnapi.herokuapp.com'; // custom list-type for route page
// custom list-type for route page
const pageToListType = {
  top: 'news',
  new: 'newest'
};
const importModule = function (url, onload, onerror) {
  let script = document.createElement('script');
  script.type = 'module';
  script.src = url;
  script.onload = () => {
    script.parentNode.removeChild(script);
    onload && onload();
  };
  script.onerror = () => {
    script.parentNode.removeChild(script);
    onerror && onerror();
  };
  document.head.appendChild(script);
};
class HnApp extends RenderIdom(Polymer.Element) {
  ready() {
    super.ready();
    this.forceRender();
  }
  render() {
    let style = `
      :host {
        display: block;
        box-sizing: border-box;
        min-height: 100vh;
        background-color: white;
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
        --detail-font-size: 0.75rem;
        --detail-font-color: #666;
        --separator-border: 1px solid #eee;
      }

      #views > :not(.selectedView) {
        display: none !important;
      }

      #views > * {
        padding: 1rem;
      }

      .loading {
        color: var(--detail-font-color);
      }`;
    return h(
      'root',
      null,
      h(
        'style',
        null,
        style
      ),
      h('simple-router', { 'on-path-changed': e => this._pathChanged(e) }),
      h('slot', null),
      h(
        'div',
        { id: 'views' },
        h('hn-list', {
          class$: this._viewClass('list', this._view, this._loading),
          list: this._listData,
          type: this._listType,
          page: this._listPage,
          pageSize: '30' }),
        h('hn-item', {
          class$: this._viewClass('item', this._view, this._loading),
          item: this._itemData }),
        h('hn-user', {
          class$: this._viewClass('user', this._view, this._loading),
          user: this._userData }),
        h('hn-404', {
          class$: this._viewClass('404', this._view, this._loading) }),
        h('hn-offline', {
          class$: this._viewClass('offline', this._view, this._loading),
          'on-refresh': e => this._refreshRoute(e) })
      ),
      h(
        'div',
        { 'class': 'loading', hidden$: !this._loading },
        h('slot', { name: 'load' })
      )
    );
  }
  static get observers() {
    return ['_routeChanged(_path)', '_fetchList(_listPath, _listPage)', '_fetchItem(_itemId)', '_fetchUser(_userName)', '_viewChanged(_view)', '_selectedClass(_view, _listType)'];
  }
  _pathChanged(e) {
    this._path = e.target.path;
  }
  _routeChanged(path) {
    let [page, detail] = path;
    if (!page) {
      page = 'top';
    }
    let props = {};
    let pending = this._pendingFetch = {};
    switch (page) {
      case 'item':
        if (detail) {
          props._view = 'item';
          pending._itemId = props._itemId = detail;
        } else {
          props._view = '404';
        }
        break;
      case 'user':
        if (detail) {
          props._view = 'user';
          pending._userName = props._userName = detail;
        } else {
          props._view = '404';
        }
        break;
      case 'top':
      case 'new':
      case 'ask':
      case 'show':
      case 'jobs':
        props._view = 'list';
        props._listType = page;
        pending._listPage = props._listPage = detail || 1;
        props._listPath = pageToListType[page] || page;
        break;
      default:
        props._view = '404';
        break;
    }
    pending._view = props._view;
    this.setProperties(props);
  } // called when coming back online...

  // called when coming back online...
  _refreshRoute() {
    // refresh pending route path if in offline state.
    if (this._view == 'offline' && this._pendingFetch) {
      this.setProperties(this._pendingFetch);
    }
  }
  _fetchList(path, page) {
    if (path) {
      let url = path == 'news' ? '/dummy.json' : `${fetchBaseUrl}/${path}`;
      if (page) {
        url += `?page=${page}`;
      }
      this._fetch(url).then(data => this._listData = data, () => this._listPage = null);
    }
  }
  _fetchItem(id) {
    if (id) {
      this._fetch(`${fetchBaseUrl}/item/${id}`).then(data => this._itemData = data, e => this._itemId = null);
    }
  }
  _fetchUser(user) {
    if (user) {
      this._fetch(`${fetchBaseUrl}/user/${user}`).then(data => this._userData = data, () => this._userName = null);
    }
  }
  _fetch(url) {
    // scroll to top when fetching
    document.body.scrollTop = 0;
    this._loading = true;
    return fetch(url).then(response => {
      return response.json().then(data => {
        this._pendingFetch = null;
        this._loading = false;
        return data;
      });
    }, reject => {
      if (!navigator.onLine) {
        this._view = 'offline';
      }
      this._loading = false;
      return Promise.reject(reject);
    });
  }
  _viewChanged(view) {
    // Load page import on demand. Show 404 page if fails
    var resolvedPageUrl = '/idom/hn-' + view + '.js';
    importModule(resolvedPageUrl, null, () => this._view = '404');
  }
  _viewClass(name, view, loading) {
    return name == view && !loading ? 'selectedView' : '';
  } // indicate selected list/tab; here we throw a class on body
  // to be able to coordinate with the nav bar which is in body.

  // indicate selected list/tab; here we throw a class on body
  // to be able to coordinate with the nav bar which is in body.
  _selectedClass(view, page) {
    let root = document.body;
    if (this._prevSelectedClass) {
      root.classList.remove(this._prevSelectedClass);
    }
    if (view == 'list') {
      this._prevSelectedClass = `hn-${page}`;
      root.classList.add(this._prevSelectedClass);
    }
  }
}
HnApp.prototype._createPropertyAccessor('_loading');
HnApp.prototype._createPropertyAccessor('_listData');
HnApp.prototype._createPropertyAccessor('_itemData');
HnApp.prototype._createPropertyAccessor('_userData');
window.customElements.define('hn-app', HnApp);

export { HnApp };

