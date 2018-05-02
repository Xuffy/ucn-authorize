const version = ['/web/v1', '/web/v2', '/web/v3'];
import config from './config';


const apis = {
  post_user_signup: ['/user/sign-up', 'UUSER_URL'],
  post_user_application: ['/user/application', 'UUSER_URL'],
  get_user_invitationCode: ['/user/invitation-code/verify', 'UUSER_URL'],
  post_auth_signin: ['/authentication/sign-in', 'USSO_URL'],
  delete_auth_signout: ['/authentication/sign-in', 'UUSER_URL'],
  get_country: ['/country/countryall', 'UMETA_URL'],
  get_code: ['/code/all', 'UMETA_URL']
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


