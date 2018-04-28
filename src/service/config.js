export default {
  // 环境配置
  ENV: {
    // local: {
    //   path: '/static/__project',
    //   api: 'http://store.test.tailorx.cn/api',
    //   mock: 'https://www.easy-mock.com/mock/5abe0744a2146a37688ec3c1/api'
    // },
    local: {
      BASE_LYF: 'http://dev.uuser-facade.ucnholding.com:18100',
      BASE_LYF_signin: 'http://dev.usso-facade.ucnholding.com:18100',
      MOCK: 'https://www.easy-mock.com/mock/5abe0744a2146a37688ec3c1/api',
      BASE_JML: 'http://dev.umeta-facade.ucnholding.com'
    },
    develop: {
      path: '/static/__project',
      api: 'http://192.168.11.215:30704'
    },
    test: {
      path: '/static/__project',
      api: 'http://store.test.tailorx.cn/api'
    },
    production: {
      path: '/static/__project',
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
