export const sleep = (time: number) => (result: any) => {
	new Promise(resolve => setTimeout(() => resolve(result), time));
}

export const delay = (time: number) => {
	return new Promise(resolve => setTimeout(resolve, time));
}

export const throwError = () => {
	throw new Error("Test error");
}