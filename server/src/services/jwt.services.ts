import jwt, { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

const jwtConfig = {
	ac_secret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
	rf_secret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
	ac_expired_millisecond: process.env.JWT_ACCESS_TOKEN_EXPIRED_MILLISECONDS // 1 hour
};

export const createAccessToken = (userId: string, role: string, company: Schema.Types.ObjectId) => {
	try {
		const token = jwt.sign({ userId, role, company }, jwtConfig.ac_secret, {
			expiresIn: '5y'
		});
		return token;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const createRefreshToken = (userId: string, role: string) => {
	try {
		const token = jwt.sign({ userId, role }, jwtConfig.rf_secret);
		return token;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const verifyAccessToken = (token: string): string | JwtPayload => {
	try {
		const decoded = jwt.verify(token, jwtConfig.ac_secret);
		return decoded;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
