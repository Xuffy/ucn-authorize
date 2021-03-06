import dateFormat from 'dateformat';
import {localStore, sessionStore} from 'service/store';
import database from '../database/index';
import $i from '../language/index';
import router from 'service/router'
import _config from "./config";
import store from '@/store';
import {Message, MessageBox} from 'element-ui';


/**
 * 删除带有前缀下划线数据
 */
const deleteArr = (list, fieldRemark) => {
  _.map(list, item => {
    if (item) deleteObject(item);
    if (item[fieldRemark]) deleteObject(item[fieldRemark]);
  });
};

const deleteObject = (list, fieldRemark, details) => {
  _.mapObject(list, (val, key) => {
    if (key.substring(0, 1) === '_') delete list[key];
    if (list[fieldRemark]) deleteObject(list[fieldRemark]);
    if (key === details) deleteArr(list[details], fieldRemark)
  });
};


const serialization = (params) => {
  const result = []
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const element = params[key];
      result.push(`${key}=${element}`)
    }
  }
  return result.join('&')
};


export default {
  /**
   * 本地永久缓存
   */
  $localStore: localStore,

  /**
   * 本地会话缓存
   */
  $sessionStore: sessionStore,

  /**
   * 格式化日期
   */
  $dateFormat: dateFormat,

  /**
   * 国际化语言配置
   */
  $i,

  /**
   * 字段配置
   */
  $db: database,


  /**
   * 字段配置
   * @param db
   * @param data
   * @param cb
   * @returns {Array}
   */
  $getDB(db, data, cb) {

    let list = [];
    db = _.values(db);
    _.map(data, (value, index) => {
      let obj = {};
      _.map(db, val => {
        let dv = value[val.key]
          , cd = _.clone(val);
        if (!_.isUndefined(dv) || val._important) {
          cd.value = _.isUndefined(dv) ? '' : dv;
          obj[val.key] = cd;
        }
      });
      if (cb) obj = _.extend(obj, cb(obj, index));
      list.push(obj);
    });
    return list;
  },

  /**
   * 生成唯一标识
   * @returns {string}
   */
  $getUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (d + Math.random() + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },

  /**
   * 字节转换
   * @returns {string}
   */
  $bytesConvert(val) {
    if (val === 0) {
      return '0 B'
    }

    let k = 1024
      , sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      , i = Math.floor(Math.log(val) / Math.log(k));

    return (val / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  },


  /**
   * 权限验证
   * @param value
   * @returns {boolean}
   */
  $auth(value) {
    let user = localStore.get('user') || {}
      , auths = (user.userResourceCodes || []).concat(user.userType)
      , pass = false;

    value = _.isArray(value) ? value : [value];

    _.map(value, val => {
      pass = _.indexOf(auths, val) > -1;
    });

    return pass;
  },

  /**
   * 表单验证
   * @param data
   * @param db
   * _rules:{
     *   type:'Number', // 数据类型：Number、Regexp、Email
     *   required:true, // 必填项
     *   max:10, // 最大值
     *   min:0, // 最小值
     *   length:20, // 最大长度
     *   minLength:20, // 最小长度
     * }
   * @returns {boolean}
   */
  $validateForm(data, db) {

    for (let k in data) {
      let val = (data[k])
        , item = _.findWhere(db, {key: k}) || {}
        , key = item.key || true
        , validate;

      if (_.isEmpty(item) || !_.isObject(item._rules)) continue;

      validate = item._rules;

      if (validate.required && !/\S/.test(val)) {
        Message.warning(`${$i.util.validateRequired} ${item.label}`);
        return key;
      }

      if (!/\S/.test(val)) continue;

      switch (validate.type) {
        case 'Number':
          if (_.isRegExp(validate.reg) && !validate.reg.test(val)) {
            Message.warning(`${$i.util.validateCorrect} ${item.label}`);
            return key;
          }
          if (!/^[0-9]+\.?[0-9]{0,9}$/.test(val)) {
            Message.warning(`${$i.util.validateCorrect} ${item.label}`);
            return key;
          }
          if (validate.max && validate.max < Number(val)) {
            Message.warning(`${item.label} ${$i.util.validateValueGreater} ${validate.max}`);
            return key;
          }
          if (validate.min && validate.min > Number(val)) {
            Message.warning(`${item.label} ${$i.util.validateValueLess} ${validate.max}`);
            return key;
          }
          break;
        case 'Email':
          if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val)) {
            Message.warning(`${$i.util.validateCorrect} ${item.label}`);
            return key;
          }
          break;
        case 'Regexp':
          if (_.isRegExp(validate.reg) && !validate.reg.test(val)) {
            Message.warning(item.label || `${$i.util.validateCorrect} ${item.label}`);
            return key;
          }
          break;
      }

      if (validate.length && validate.length < val.length) {
        Message.warning(`${item.label} ${$i.util.validateLengthGreater} ${validate.length} ${$i.util.validateDigits}`);
        return key;
      }

      if (validate.minLength && validate.minLength > val.length) {
        Message.warning(`${item.label} ${$i.util.validateLengthLess} ${validate.minLength} ${$i.util.validateDigits}`);
        return key;
      }

    }

    return false;

  },


  /**
   * table 数据过滤
   * @type {{contrast(*=, *=): *, setHighlight(*=): *, setHideSame(*=): *}}
   */
  $table: {
    contrast(data, type) {
      if (_.isEmpty(data)) return [];

      let first = data[0], keyData = {};

      _.map(data, value => {
        _.mapObject(value, (val, key) => {
          if (type === 'same' && first[key]) {
            keyData[key] = first[key].value === val.value;
          } else if (type === 'def' && first[key] && first[key].value !== val.value) {
            keyData[key] = true;
          }
        });
      });
      return keyData;
    },
    setHighlight(data) {
      let keyData = this.contrast(data, 'def')
        , len = _.values(keyData).length
        , i = 0;
      keyData = _.mapObject(keyData, (val) => {
        // let z = 200 - ((255 / len) * i);
        // val = `rgba(${z},255,255,1)`;
        val = `#f3510a`;
        // i++;
        return val;
      });
      return _.map(data, value => {
        return _.mapObject(value, (val, key) => {
          if (_.isObject(val)) {
            val._color = keyData[key] || '';
          }
          return val;
        });
      });
    },
    setHideSame(data) {
      let keyData = this.contrast(data, 'same');
      return _.map(data, value => {
        return _.mapObject(value, (val, key) => {
          if (keyData[key] && _.isObject(val)) {
            val._hide = keyData[key];
          }
          return val;
        });
      });
    }
  },

  $filterModify(list, remark, children) {
    let fieldRemark = remark || 'fieldRemark',
      details = children || 'details';
    if (_.isObject(list, details)) deleteObject(list, fieldRemark, details);
    if (_.isArray(list)) _.map(list, fieldRemark, details);
    return list;
  },

  /**
   * 时区转换 传入时区 如 0 8 -1
   */
  $getLocalTime(i) {
    if (typeof i !== 'number') return;
    const d = new Date(),
      len = d.getTime(),
      offset = d.getTimezoneOffset() * 60000,
      utcTime = len + offset;
    return new Date(utcTime + 3600000 * i);
  },

  /**
   *
   * @param arr
   * @returns {Uint8Array | any[] | Int32Array | Uint16Array | Uint32Array | Float64Array | any}
   */
  $copyArr(arr) {
    return arr.map((e) => {
      if (typeof e === 'object') {
        return Object.assign({}, e)
      } else {
        return e
      }
    })
  },


  /**
   * 用户行为缓存
   * @type {{set(*, *): void, get(*): *}}
   */
  $userAction: {
    set(key, value) {
      let ua = sessionStore.get('user_action') || {};
      ua[key] = value;
      sessionStore.set('user_action', ua);
    },
    get(key) {
      let ua = sessionStore.get('user_action') || {};
      return ua[key];
    }
  },


  /**
   * 转换表格中需要由字典表数据来转换的数据
   * */
  $change(obj, code, e, isString) {
    let data, value;

    value = e[code].value;

    data = _.findWhere(obj, {code: isString ? String(value) : value});

    return data || '';
  },
  /**
   * 深拷贝
   * @param data
   * @returns {*}
   */
  $depthClone(data) {
    return data ? JSON.parse(_.clone(JSON.stringify(data))) : data;
  },

  $filterDic(data, transForm = 'transForm') {
    _.mapObject(data, (val, k) => {
      if (val.value === true || val.value === false) {
        val.value = val.value ? 1 : 0;
      }
      val.originValue = val.value;
      if (val[transForm] && !data._remark && ['fieldDisplay', 'fieldRemark', 'fieldRemarkDisplay'].indexOf(k) < 0) {
        switch (val[transForm]) {
          case 'time':
            val._value = dateFormat(val.value, val.time || 'yyyy-mm-dd HH:MM');
            break;
          default:
            if (!store.state.dic.length) return;
            let dic = _.findWhere(store.state.dic, {'code': val[transForm]});
            if (!dic || !dic.codes) return;
            val._option = dic.codes;
            let code = _.findWhere(dic.codes, {'value': val.originValue});
            if (code) {
              val._value = code.name || code[val.name] || '';
            }
        }
      }
    });
    return data;
  },

  /**
   * $window.open
   */

  $windowOpen(config) {
    let url = `//${window.location.host}/#${config.url}`, p = {};
    if (!_.isEmpty(config.params) && !config.params.length) {
      _.mapObject(config.params, (val, key) => {
        if (url.indexOf(`{${key}}`) < 0) {
          p[key] = val;
        }
      });
    }
    url = _.template(url)(config.params || {});
    return window.open(`${url}?${serialization(p)}`, '_blank');
  },

  $mul() {
    //解决JS 精度问题 乘法
    let m = 0,
      s2 = '',
      strArr = 1

    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i].toString().indexOf('.') > 0) {
        m += arguments[i].toString().split(".")[1].length;
        arguments[i] = Number(arguments[i].toString().replace(".", ""));
      }

      strArr *= Number(arguments[i]);
    }

    return strArr / Math.pow(10, m);
  },
  $sub(num1, num2) {
    //解决JS 精度问题(减法)
    let baseNum,
      baseNum1,
      baseNum2,
      precision // 精度

    try {
      baseNum1 = num1.toString().split(".")[1].length;
    }
    catch (e) {
      baseNum1 = 0;
    }

    try {
      baseNum2 = num2.toString().split(".")[1].length;
    }
    catch (e) {
      baseNum2 = 0;
    }

    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision :(baseNum1 >= baseNum2) ? baseNum1 : baseNum2;

    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
  },
  $numDiv(num1, num2) {
    //除法
    let baseNum1 = 0, baseNum2 = 0;
    let baseNum3, baseNum4;
    try {
      baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
      baseNum1 = 0;
    }
    try {
      baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
      baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
  },
  $numAdd(num1, num2) {
    // 加法
    let baseNum,
      baseNum1,
      baseNum2;

    try {
      baseNum1 = num1.toString().split(".")[1].length;
    }
    catch (e) {
      baseNum1 = 0;
    }

    try {
      baseNum2 = num2.toString().split(".")[1].length;
    }
    catch (e) {
      baseNum2 = 0;
    }

    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));

    return (num1 * baseNum + num2 * baseNum) / baseNum;
  },
  // createRandom(10,0,50) //生成10个从0-50之间不重复的随机数
  $createRandom(num, from, to) {
    let arr = [];
    let json = {};
    while (arr.length < num) {
      //产生单个随机数
      let ranNum = Math.floor(Math.random() * (to - from)) + from;
      //通过判断json对象的索引值是否存在 来标记 是否重复
      if (!json[ranNum]) {
        json[ranNum] = 1;
        arr.push(ranNum);
      }
    }
  }
}
