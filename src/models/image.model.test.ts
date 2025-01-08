import ImageModel from './image.model';

describe('ImageModel', () => {
	it('model initiates correctly', () => {
		const model = new ImageModel({
			"id": "YSG_0qITu",
			"url": "https://cdn2.thecatapi.com/images/YSG_0qITu.jpg",
			"width": 1137,
			"height": 565,
		});

		// tests
		expect(model.id).toEqual('YSG_0qITu');
		expect(model.url).toEqual('https://cdn2.thecatapi.com/images/YSG_0qITu.jpg');
		expect(model.width).toEqual(1137);
		expect(model.height).toEqual(565);
	});
});
