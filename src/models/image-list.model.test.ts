import ImageListModel from './image-list.model';

describe('ImageListModel', () => {
	it('model initiates correctly', () => {
		const model = new ImageListModel({
			images: [{
				"id": "-Xf45D4Yq",
				"url": "https://cdn2.thecatapi.com/images/-Xf45D4Yq.jpg",
				"width": 425,
				"height": 565,
			},
			{
				"id": "rQyyL1EBE",
				"url": "https://cdn2.thecatapi.com/images/rQyyL1EBE.jpg",
				"width": 423,
				"height": 568,
			}],
			more: true
		});

		// tests
		expect(model.images.length).toEqual(2);
		expect(model.images[0].id).toEqual('-Xf45D4Yq');
		expect(model.images[0].url).toEqual('https://cdn2.thecatapi.com/images/-Xf45D4Yq.jpg');
		expect(model.images[0].width).toEqual(425);
		expect(model.images[0].height).toEqual(565);
		expect(model.images[1].id).toEqual('rQyyL1EBE');
		expect(model.images[1].url).toEqual('https://cdn2.thecatapi.com/images/rQyyL1EBE.jpg');
		expect(model.images[1].width).toEqual(423);
		expect(model.images[1].height).toEqual(568);
		expect(model.more).toBeTruthy();
	});

	it('model initiates correctly - empty', () => {
		const model = new ImageListModel({
			images: [],
			more: false
		});

		// tests
		expect(model.images.length).toEqual(0);
		expect(model.more).toBeFalsy();
	});
});
