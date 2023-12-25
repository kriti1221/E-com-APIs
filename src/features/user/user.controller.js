import UserModel from './user.modal.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export default class UserController {


    async signUp(req, res) {
        const { name, email, password, type } = req.body;
        const user = await UserModel.SignUp(name, email, password, type);
        res.status(201).send(user);
    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await UserModel.SignIn(email);
            console.log(result);
            if (!result) {
                return res.status(404).send('Incorrect Credentials');
            }
            else {
                // compare passwords
                const ans = await bcrypt.compare(password, result.password);
                if (ans) {
                    const token = jwt.sign({ userID: result.id, email: result.email },
                        'nZoxVFd0ZqiskGuRoAmgYTRQqhmrK1Aq',
                        {
                            expiresIn: '1h',
                        });
                    return res.status(200).send(token);
                }
                else {
                    return res.status(403).send("Password Incorrect");
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}