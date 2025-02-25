export function nameInitials(fullName: string) {
	const names = fullName.split(" ");

	const first = names[0][0];
	const last = names[names.length - 1][0];

	return first + last;
}
