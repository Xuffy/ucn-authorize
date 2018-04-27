const version = ['/web/v1', '/web/v2', '/web/v3'];
import config from './config';


const apis = {
  post_user_signup: ['/user/sign-up', 'BASE_LYF'],
  post_user_application: ['/user/application', 'BASE_LYF'],
  get_user_invitationCode: ['/user/invitation-code/verify', 'BASE_LYF'],
  post_auth_signin: ['/authentication/sign-in', 'BASE_LYF_signin'],
  delete_auth_signout: ['/authentication/sign-in', 'BASE_LYF_signin'],
  get_country: ['/country/all', 'BASE_JML'],
  get_code: ['/code/all', 'BASE_JML']
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


