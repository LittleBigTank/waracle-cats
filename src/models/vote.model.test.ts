import VoteModel from './vote.model';

describe('VoteModel', () => {
	it('model initiates correctly', () => {
		const model = new VoteModel({
			'id': 1242122,
			'image_id': 'vzzZs3_nr',
			'sub_id': 'W1235',
			"value": 2,
		});

		// tests
		expect(model.id).toEqual(1242122);
		expect(model.imageId).toEqual('vzzZs3_nr');
		expect(model.userId).toEqual('W1235');
		expect(model.value).toEqual(2);
	});
});
