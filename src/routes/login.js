import route from './route';
import userModel from '../models/user';

const fuc = route()(function cb() { console.log('data', cb); });
console.log(fuc);
export default fuc;
// export default async function (req, res) {
//     const {
//         username,
//         password,
//     } = req;

//     const user = await userModel.find({ username });
// }
