import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en/index'
import zhCN from './zh-CN/index'

export default {
  en: Object.assign(en, enLocale),
  zhCN: Object.assign(zhCN, zhLocale)
}
