import ApiHelper from '../helpers/api.helper';

// models
import VoteModel from '../models/vote.model';
import VoteAPIInterface from '../models/interfaces/voteAPI.interface';

class VoteService {
	getVotes = (): Promise<Array<VoteModel>> => {
		return ApiHelper.get({
			url: '/v1/votes'
		})
		.catch(() => {
			return null;
		})
		.then((data: Array<VoteAPIInterface>) => {
			return data.map(x => {
				return new VoteModel(x);
			});
		});
	};

	setVote = (imageId: string, userId: string, value: number): Promise<Array<VoteModel>> => {
		return ApiHelper.post({
			url: '/v1/votes',
			body: {
				'image_id': imageId,
				'sub_id': userId,
				value: value
			}
		})
		.then(() => {
			// vote total is by all users so get all again to see
			// if other users have changed the count
			return this.getVotes();
		})
	};
}

export default new VoteService();