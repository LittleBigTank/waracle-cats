import ApiHelper from '../helpers/api.helper';

// models
import ApiResponseInterface from '../models/interfaces/ApiResponse.interface';
import FavouriteModel from '../models/favourite.model';
import FavouriteApiInterface from '../models/interfaces/favouriteApi.interface';

class FavouriteService {
	getFavourites = (): Promise<Array<FavouriteModel>> => {
		return ApiHelper.get({
			url: '/v1/favourites'
		})
		.catch(() => {
			return null;
		})
		.then((data: Array<FavouriteApiInterface>) => {
			return data.map(x => {
				return new FavouriteModel(x);
			});
		});
	};

	addFavourite = (imageId: string, userId: string): Promise<FavouriteModel> => {
		return ApiHelper.post({
			url: '/v1/favourites',
			body: {
				'image_id': imageId,
				'sub_id': userId
			}
		})
		.then((data: ApiResponseInterface) => {
			return new FavouriteModel({ id: data.id, image_id: imageId, sub_id: userId});
		});
	};

	removeFavourite = (id: number): Promise<number> => {
		return ApiHelper.delete({
			url: `/v1/favourites/${id}`
		})
		.then(() => {
			return id;
		});
	};
}

export default new FavouriteService();