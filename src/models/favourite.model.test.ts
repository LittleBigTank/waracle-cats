import FavouriteModel from './favourite.model';

describe('FavouriteModel', () => {
	it('model initiates correctly', () => {
		const model = new FavouriteModel({
			'id': 232507510,
			'image_id': 'YSG_0qITu',
			'sub_id': 'W1234',
		});

		// tests
		expect(model.id).toEqual(232507510);
		expect(model.imageId).toEqual('YSG_0qITu');
		expect(model.userId).toEqual('W1234');
	});
});
