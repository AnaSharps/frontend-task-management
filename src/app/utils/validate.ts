export function validate(credentials: { val: string; type: string }) {
	switch (credentials.type) {
		case "email":
			const email = /\S+@\S+\.\S+/;
			if (email?.test(String(credentials.val).toLowerCase())) return "";
			else return "Please enter a valid email address!";
		case "pass":
			const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&]).+$/;
			if (password?.test(String(credentials.val))) return "";
			else return "Please enter a valid Password!";
	}
	return "";
}
