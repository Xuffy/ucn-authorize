export default {
  // 环境配置
  ENV: {
    // local: {
    //   path: '/static/__project',
    //   api: 'http://store.test.tailorx.cn/api',
    //   mock: 'https://www.easy-mock.com/mock/5abe0744a2146a37688ec3c1/api'
    // },
    local: {
      BASE_LYF: 'http://dev.uuser-facade.ucnscm.com',
      BASE_LYF_signin: 'http://dev.usso-facade.ucnscm.com',
      MOCK: 'https://www.easy-mock.com/mock/5abe0744a2146a37688ec3c1/api',
      BASE_JML: 'http://dev.umeta-facade.ucnscm.com',

      USSO_URL: 'http://dev.usso-facade.ucnscm.com', // sso 服务
      UUSER_URL: 'http://dev.uuser-facade.ucnscm.com', // 用户中心
      UMETA_URL: 'http://dev.umeta-facade.ucnscm.com', // 元数据
    },
    develop: {
      USSO_URL: 'http://dev.usso-facade.ucnscm.com', // sso 服务
      UUSER_URL: 'http://dev.uuser-facade.ucnscm.com', // 用户中心
      UMETA_URL: 'http://dev.umeta-facade.ucnscm.com', // 元数据
    },
    test: {
      USSO_URL: 'http://test.usso-facade.ucnscm.cn', // sso 服务
      UUSER_URL: 'http://test.uuser-facade.ucnscm.cn', // 用户中心
      UMETA_URL: 'http://test.umeta-facade.ucnscm.cn', // 元数据
    },
    production: {
      api: 'https://store.tailorx.cn/api'
    }
  }[process.env.NODE_ENV],

  // 请求超时
  TIMEOUT: 60000,

  // 项目版本号
  VERSION: `3.3.4.${process.env.VERSION}`,

  // 本地store缓存 前缀
  STORE_PREFIX: 'ucn_'
}
