import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizeError } from '../errors/Errors.js';
import { verifyAccessToken } from '../services/jwt.services.js';

export const authJwtTokenVerify = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = Array.isArray(req.headers['ac-token']) ? req.headers['ac-token'][0] : req.headers['ac-token'];
		if (!token) throw new UnauthorizeError();
		const decodedToken = verifyAccessToken(token);
		if (!decodedToken) return next(new UnauthorizeError('Error decodedToken'));
		req.user = decodedToken;
		next();
	} catch (error: any) {
		next(new UnauthorizeError(error.message));
	}
};

export const authRole = (role: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (req.user.role === 'admin') {
			return next();
		}
		if (req.user.role !== role) {
			return next(new ForbiddenError('You do not have access to this route'));
		} else {
			next();
		}
	};
};
