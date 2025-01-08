// services
import FavouriteService from './favourite.service';
import ApiHelper from '../helpers/api.helper';

// mocks
import { mockAPIFavourites, mockNewAPIFavourite } from '../test/favourites.mock';

describe('Favourite Service', () => {
	describe('getFavourites', () => {
		it('Returns favourites', async () => {
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(mockAPIFavourites);
			const results = await FavouriteService.getFavourites();

			expect(results.length).toEqual(2);
			expect(results).toEqual([
				{
					"id": mockAPIFavourites[0].id,
					"imageId": mockAPIFavourites[0].image_id,
					"userId": mockAPIFavourites[0].sub_id,
				},
				{
					"id": mockAPIFavourites[1].id,
					"imageId": mockAPIFavourites[1].image_id,
					"userId": mockAPIFavourites[1].sub_id,
				}
			]);

			expect(ApiHelper.get).toBeCalledTimes(1);
		});

		it('throws an error if null', () => {
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);
			expect(() => FavouriteService.getFavourites()).rejects.toThrow(Error);
		});
	});

	describe('addFavourite', () => {
		it('Add favourite', async () => {
			jest.spyOn(ApiHelper, 'post').mockResolvedValue(mockNewAPIFavourite);
			const result = await FavouriteService.addFavourite(mockNewAPIFavourite.image_id, mockNewAPIFavourite.sub_id);

			expect(result).toEqual({
				"id": mockNewAPIFavourite.id,
				"imageId": mockNewAPIFavourite.image_id,
				"userId": mockNewAPIFavourite.sub_id,
			});

			expect(ApiHelper.post).toBeCalledTimes(1);
		});

		it('Add favourite call failed', async () => {
			jest.spyOn(ApiHelper, 'post').mockResolvedValue(null);
			expect(() => FavouriteService.addFavourite(mockNewAPIFavourite.image_id, mockNewAPIFavourite.sub_id)).rejects.toThrow(Error);
		});
	});

	describe('removeFavourite', () => {
		it('Remove favourite', async () => {
			jest.spyOn(ApiHelper, 'delete').mockResolvedValue({});
			const result = await FavouriteService.removeFavourite(mockAPIFavourites[0].id);

			expect(result).toEqual(mockAPIFavourites[0].id);

			expect(ApiHelper.delete).toBeCalledTimes(1);
		});
	});
});