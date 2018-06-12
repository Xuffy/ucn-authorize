import engine from 'storess/src/store-engine';
import config from  'service/config';

// store 配置
let storePrefix
  , store_plugins = [
  require('storess/plugins/defaults'),
  require('storess/plugins/expire')
]
  , localStore = engine.createStore([
  require('storess/storages/localStorage'),
  require('storess/storages/cookieStorage'),
], store_plugins)
  , sessionStore = engine.createStore([
  require('storess/storages/sessionStorage')
], store_plugins);

storePrefix = () => {
  return {
    set: (super_fn, key, value) => {
      return super_fn(config.STORE_PREFIX + key);
    },
    get: (super_fn, key, value) => {
      return super_fn(config.STORE_PREFIX + key);
    },
    remove: (super_fn, key, value) => {
      return super_fn(config.STORE_PREFIX + key);
    }
  }
};

localStore.addPlugin(storePrefix);
sessionStore.addPlugin(storePrefix);

export {
  localStore,
  sessionStore
};

