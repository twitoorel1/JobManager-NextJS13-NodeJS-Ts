import { NextFunction, Response, Request } from 'express';
import { NotFoundError, BadRequestError, ServerError, UnauthorizeError, ForbiddenError, PaymentRequiredError } from './Errors.js';

function generateCustomErrorResponse(res: Response, error: any, statusCode: number) {
	return res.status(Number(statusCode)).json({
		error: true,
		message: error.message,
		// stack: process.env.NODE_ENV === "development" && error.stack ? error.stack : {},
		stack: error.stack ? error.stack : {}
	});
}

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
	switch (error.constructor) {
		case BadRequestError:
			return generateCustomErrorResponse(res, error, 400);

		case UnauthorizeError:
			return generateCustomErrorResponse(res, error, 401);

		case PaymentRequiredError:
			return generateCustomErrorResponse(res, error, 402);

		case ForbiddenError:
			return generateCustomErrorResponse(res, error, 403);

		case NotFoundError:
			return generateCustomErrorResponse(res, error, 404);

		case ServerError:
			generateCustomErrorResponse(res, error, 500);

		default:
			res.status(500).json('Something went wrong!');
			break;
	}
}

// function errorHandler2(error: any, req: Request, res: Response, next: NextFunction) {
//   switch (error.constructor) {
//     case NotFoundError:
//       return generateCustomErrorResponse(res, error, 404);

//     case UnauthorizeError:
//       return generateCustomErrorResponse(res, error, 403);

//     case BadRequestError:
//       generateCustomErrorResponse(res, error, 400);
//       break;

//     case ServerError:
//       generateCustomErrorResponse(res, error, 500);
//       break;

//     default:
//       res.status(500).json("Something went wrong!");
//       break;
//   }
// }
