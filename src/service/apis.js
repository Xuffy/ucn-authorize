const version = ['/web/v1', '/web/v2', '/web/v3'];
import config from './config';


const apis = {
  post_user_signup: ['/user/sign-up', 'UUSER_URL'],
  post_user_application: ['/user/application', 'UUSER_URL'],
  get_user_invitationCode: ['/user/invitation-code/verify', 'UUSER_URL'],
  post_auth_signin: ['/authentication/sign-in', 'USSO_URL'],
  delete_auth_signout: ['/authentication/sign-in', 'UUSER_URL'],
  get_country: ['/country/countryall', 'UMETA_URL'],
  get_code: ['/code/all', 'UMETA_URL'],
  USER_VALIDATE_ACTIVE: ['/user/validate/active/{token}/{email}', 'UUSER_URL'],
  USER_ACTIVE: ['/user/active', 'UUSER_URL'],
  POST_CODE_PART: ['/code/part', 'UMETA_URL'],
  GET_VERIFICATION_CODE_CHECK: ['/verification/code/check', 'UUSER_URL'],
  GET_VERIFICATION_CODE_REFRESH: ['/verification/code/refresh', 'UUSER_URL'],
  POST_USER_SEND_PASS_RESET: ['/user/send/pass/reset', 'UUSER_URL'],
  POST_USER_PASSWORD_RESET: ['/user/password/reset', 'UUSER_URL'],
  GET_USER_VALIDATE_RESET: ['/user/validate/reset', 'UUSER_URL']
};






let list = _.mapObject(apis, val => {
  let b = ''
    , v = version[val[2] || 0];
  if (config.IS_MOCK && config.ENV_FLAG === 'local') {
    b = config.ENV.MOCK;
  } else if (_.indexOf(_.keys(config.ENV), val[1]) > -1) {
    b = config.ENV[val[1]] + v;
  } else {
    b = config.ENV.BASE_API + v;
  }
  return b + val[0];
});

export default list;


