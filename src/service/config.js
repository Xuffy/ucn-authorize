export default {
  // 环境配置
  ENV: {
    local: {
      MOCK: '//www.easy-mock.com/mock/5abe0744a2146a37688ec3c1/api',
      USSO_URL: '//192.168.51.208:11006', // sso 服务
      UUSER_URL: '//192.168.51.208:11004', // 用户中心
      UMETA_URL: '//192.168.51.208:11005', // 元数据

      CUSTOMER_URL:'http://192.168.51.220:8080',
      SUPPLIER_URL:'http://192.168.51.220:8060',
      SERVICE_URL:'http://192.168.51.220:8050'
    },
    develop: {
      USSO_URL: '//192.168.51.208:11006', // sso 服务
      UUSER_URL: '//192.168.51.208:11004', // 用户中心
      UMETA_URL: '//192.168.51.208:11005', // 元数据

      CUSTOMER_URL:'http://dev.customer.ucnscm.cn',
      SUPPLIER_URL:'http://dev.supplier.ucnscm.cn',
      SERVICE_URL:'http://dev.service.ucnscm.cn'
    },
    test: {
      USSO_URL: '//test.usso-facade.ucnscm.cn', // sso 服务
      UUSER_URL: '//test.uuser-facade.ucnscm.cn', // 用户中心
      UMETA_URL: '//test.umeta-facade.ucnscm.cn', // 元数据

      CUSTOMER_URL:'http://test.customer.ucnscm.cn',
      SUPPLIER_URL:'http://test.supplier.ucnscm.cn',
      SERVICE_URL:'http://test.service.ucnscm.cn'
    },
    production: {
      api: 'https://store.tailorx.cn/api'
    }
  }[process.env.NODE_ENV],

  // 是否开启token验证
  AUTH: false,

  // 环境标识
  ENV_FLAG: process.env.NODE_ENV,

  // 是否mock
  IS_MOCK: false,

  // 请求超时
  TIMEOUT: 60000,

  // 默认语言设置
  // LANGUAGE: 'zh-CN',
  LANGUAGE: 'en',

  // 项目版本号
  VERSION: `2.0.${process.env.VERSION}`,

  // 本地store缓存 前缀
  STORE_PREFIX: 'ucn_auth_'
}
