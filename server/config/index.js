import devConf from './develop.config';
import proConf from './product.config';

export default process.env.NODE_ENV === 'productioin' ? proConf : devConf;
