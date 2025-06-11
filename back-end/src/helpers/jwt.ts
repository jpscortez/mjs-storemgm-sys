import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (payload: object): string => {
	return jwt.sign(payload, SECRET);
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
	try {
		return jwt.verify(token, SECRET);
	} catch (err) {
		throw new Error("Invalid token");
	}
};
