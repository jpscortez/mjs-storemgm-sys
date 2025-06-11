import {prismaClient} from "../../database/prisma-client";
import bcrypt from "bcryptjs";
import {generateToken} from "../../helpers/jwt";

export async function Login(username: string, password: string) {
	// Step 1: Fetch a user with the given email
	const user = await prismaClient.user.findUnique({where: {username}});

	// If no user is found, throw an error
	if (!user) {
		throw new Error(`No user found for username: ${username}`);
	}

	// Step 2: Check if the password is correct
	const isPasswordValid = await bcrypt.compare(password, user.password);

	// If password does not match, throw an error
	if (!isPasswordValid) {
		throw new Error("Invalid password");
	}

	const token = generateToken({name: user.name, username: user.username, id: user.id});

	// Step 3: Generate a JWT containing the user's ID and return it
	return {
		user: {
			name: user.name,
			username: user.username,
			id: user.id,
		},
		token,
	};
}
