import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import Users from '../models/User';
import bcrypt from 'bcrypt';

const userController = {
	updateUser: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		try {
			const { avatar, name } = req.body;
			await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, name });
			res.json({ message: '업데이트 성공!' });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	resetPassword: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		if (req.user.type !== 'register')
			return res.status(400).json({
				message: `${req.user.type} 로그인 계정은 이 기능을 사용할 수 없습니다.`,
			});
		try {
			const { password } = req.body;
			const passwordHash = await bcrypt.hash(password, 12);
			await Users.findOneAndUpdate(
				{ _id: req.user._id },
				{ password: passwordHash }
			);
			res.json({ message: '패스워드 변경 성공!' });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	getUser: async (req: Request, res: Response) => {
		try {
			const user = await Users.findById(req.params.id).select('-password');
			res.json(user);
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
};

export default userController;
