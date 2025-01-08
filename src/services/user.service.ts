import UserModel from "../models/user.model";

class UsersService {
	getUser = () => {
		return new UserModel(process.env.REACT_APP_USER_ID!);
	};

	setUser = (userId: string) => {
		return new UserModel(userId);
	}
}

export default new UsersService();
