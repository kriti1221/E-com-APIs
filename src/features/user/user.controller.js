import UserModel from './user.modal.js';
import jwt from 'jsonwebtoken';


export default class UserController {


    signUp(req, res) {
        const { name, email, password, type } = req.body;
        const user = UserModel.SignUp(name, email, password, type);
        res.status(201).send(user);
    }

    signIn(req, res) {
        const { email, password } = req.body;
        const result = UserModel.SignIn(email, password);
        if (!result) {
            return res.status(404).send('Incorrect Credentials');
        }
        else {
            const token = jwt.sign({ userID: result.id, email: result.email }, 
                'nZoxVFd0ZqiskGuRoAmgYTRQqhmrK1Aq',
                {
                    expiresIn: '1h',
                });
            return res.status(200).send(token);
        }

    }
}