import { Response, NextFunction } from 'express';
import Users from '../models/User';
import jwt from 'jsonwebtoken';
import { IDecodedToken, IReqAuth } from '../config/interface';

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization');
		if (!token) return res.status(400).json({ message: '잘못된 인증입니다.' });
		const decoded = <IDecodedToken>(
			jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
		);
		console.log(decoded);
		if (!decoded)
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		const user = await Users.findOne({ _id: decoded.id });
		if (!user)
			return res.status(400).json({ message: '유저는 존재하지 않습니다.' });

		req.user = user;

		next();
	} catch (err: any) {
		return res.status(500).json({ message: err.message });
	}
};

export default auth;
