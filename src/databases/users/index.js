import bcrypt from 'bcryptjs';
import  db from '../../services/mongo';

import schema from './schema';

const conn = db.getConnect();

const SALT_ROUNDS = 10;

schema.statics.generateHash = (password) => bcrypt.hashSync(password, SALT_ROUNDS);

schema.statics.comparePasswordAndHash = (password, hash) => bcrypt.compareSync(password, hash);

export default conn.model('users', schema);