import UserService from './user.service';

describe('User Service', () => {
	it('getUser', async () => {
		const user = UserService.getUser();
		expect(user).toEqual({ id: 'W1234' });
	});

	it('setUser', async () => {
		const user = UserService.setUser( 'W1235');
		expect(user).toEqual({ id: 'W1235' });
	});
});
