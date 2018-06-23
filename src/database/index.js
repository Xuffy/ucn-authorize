import language from '../language/index';
import {database} from 'ucn-tool/src/index';
import login from './login';

const db = {
  login
};
export default database(_, language, db);
