// services
import VoteService from './vote.service';
import ApiHelper from '../helpers/api.helper';

// mocks
import { mockAPIVotes, mockNewAPIVote } from '../test/votes.mock';

describe('Vote Service', () => {
	describe('getVotes', () => {
		it('Returns votes', async () => {
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(mockAPIVotes);
			const results = await VoteService.getVotes();

			expect(results.length).toEqual(3);
			expect(results).toEqual([
				{
					"id": mockAPIVotes[0].id,
					"imageId": mockAPIVotes[0].image_id,
					"userId": mockAPIVotes[0].sub_id,
					"value": mockAPIVotes[0].value,
				},
				{
					"id": mockAPIVotes[1].id,
					"imageId": mockAPIVotes[1].image_id,
					"userId": mockAPIVotes[1].sub_id,
					"value": mockAPIVotes[1].value,
				},
				{
					"id": mockAPIVotes[2].id,
					"imageId": mockAPIVotes[2].image_id,
					"userId": mockAPIVotes[2].sub_id,
					"value": mockAPIVotes[2].value,
				}
			]);

			expect(ApiHelper.get).toBeCalledTimes(1);
		});

		it('throws an error if null', () => {
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);
			expect(() => VoteService.getVotes()).rejects.toThrow(Error);
		});
	});

	describe('setVote', () => {
		it('Returns updated votes', async () => {
			jest.spyOn(ApiHelper, 'post').mockResolvedValue(mockNewAPIVote);
			jest.spyOn(ApiHelper, 'get').mockResolvedValue([...mockAPIVotes, mockNewAPIVote]);
			const results = await VoteService.setVote(mockNewAPIVote.image_id, mockNewAPIVote.sub_id, mockNewAPIVote.value);

			expect(results.length).toEqual(4);
			expect(results).toEqual([
				{
					"id": mockAPIVotes[0].id,
					"imageId": mockAPIVotes[0].image_id,
					"userId": mockAPIVotes[0].sub_id,
					"value": mockAPIVotes[0].value,
				},
				{
					"id": mockAPIVotes[1].id,
					"imageId": mockAPIVotes[1].image_id,
					"userId": mockAPIVotes[1].sub_id,
					"value": mockAPIVotes[1].value,
				},
				{
					"id": mockAPIVotes[2].id,
					"imageId": mockAPIVotes[2].image_id,
					"userId": mockAPIVotes[2].sub_id,
					"value": mockAPIVotes[2].value,
				},
				{
					"id": mockNewAPIVote.id,
					"imageId": mockNewAPIVote.image_id,
					"userId": mockNewAPIVote.sub_id,
					"value": mockNewAPIVote.value,
				}
			]);

			expect(ApiHelper.post).toBeCalledTimes(1);
			expect(ApiHelper.get).toBeCalledTimes(1);
		});

		it('throws an error if null', async () => {
			jest.spyOn(ApiHelper, 'post').mockResolvedValue(null);
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);
			expect(() => VoteService.setVote(mockNewAPIVote.image_id, mockNewAPIVote.sub_id, mockNewAPIVote.value)).rejects.toThrow(Error);
			expect(ApiHelper.post).toBeCalledTimes(1);
			expect(ApiHelper.get).toBeCalledTimes(0);
		});

		it('throws an error if second call is null', () => {
			jest.spyOn(ApiHelper, 'post').mockResolvedValue(mockNewAPIVote);
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);
			expect(() => VoteService.setVote(mockNewAPIVote.image_id, mockNewAPIVote.sub_id, mockNewAPIVote.value)).rejects.toThrow(Error);
			expect(ApiHelper.post).toBeCalledTimes(1);
			//TODO: expect(ApiHelper.get).toBeCalledTimes(1);
		});
	});
});