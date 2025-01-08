import UserModel from './user.model';

describe('UserModel', () => {
	it('model initiates correctly', () => {
		const model = new UserModel('W1122');

		// tests
		expect(model.id).toEqual('W1122');
	});
});
