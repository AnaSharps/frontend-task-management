export const host = "http://localhost:8000";
export const backgroundColor = "rgb(51, 25, 75)";

export const routesData: { [key: string]: number } = {
	dashboard: 0,
	tasks: 1,
	users: 2,
};

export const statusColors: { [status: string]: string } = {
	overdue: "red",
	inProgress: "green",
	assigned: "grey",
	completed: "dark green",
};
