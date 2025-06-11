import {User} from "@/Models/User";
import {apiClient} from "@/Utils/apiClient";

type signInProps = {
	username: string;
	password: string;
};

export async function signIn({username, password}: signInProps): Promise<{user: User; token: string}> {
	const {user, token} = await apiClient.post(`/auth/signIn`, {username, password}).then((response) => response.data);

	return {user, token};
}

export async function authenticate(): Promise<User> {
	const {user} = await apiClient.get("/auth/authenticate").then((response) => response.data);

	return user;
}
