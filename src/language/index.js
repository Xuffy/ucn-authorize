import {localStore, sessionStore} from 'service/store';
import config from 'service/config';
import Qs from 'qs'

const getUrlParam=()=>{
  var href  =window.location.href;
  var params = href.split('?')[1];
  if (!params){
    return {};
  }
  var paramArr = params.split('&');
  var res = {};
  for(var i = 0;i<paramArr.length;i++){
    var str = paramArr[i].split('=');
    res[str[0]]=str[1];
  }
  return res;
}

// 获取地址参数 存到缓存中
let query=getUrlParam(), lang;

// query = Qs.parse(query);
lang = query.language || config.LANGUAGE;

sessionStore.set('query', query);
localStore.set('language', lang);



const json = {
  login: _.extend({},
    require(`./${lang}/login/userInformation`),
    {
      btn: require(`./${lang}/login/btn`),
      companyInformation: require(`./${lang}/login/companyInformation`),
      getInvitationCode: require(`./${lang}/login/getInvitationCode`),
      placeholder: require(`./${lang}/login/placeholder`),
      prompt: require(`./${lang}/login/prompt`),
      text: require(`./${lang}/login/text`),
      userInformation: require(`./${lang}/login/userInformation`)
    }
  ),
  hintMessage: _.extend({},
    require(`./${lang}/hintMessage/index`)
  ),
  activation: _.extend({},
    require(`./${lang}/activation/index`)
  ),
  util: _.extend({},
    require(`./${lang}/util/index`)
  )
}

export default json;
