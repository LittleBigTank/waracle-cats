// services
import ImageService from './image.service';
import ApiHelper from '../helpers/api.helper';

// mocks
import { mockAPIImages, mockNewAPIImage1 } from '../test/images.mock';
const mockImage = new File(['1234'], 'cat.jpg', {
	type: 'image/jpeg',
});

const limit = 6;

describe('Favourite Service', () => {
	describe('getImages', () => {
		it('Returns images', async () => {
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(mockAPIImages);
			const results = await ImageService.getImages(0, limit);

			expect(results.length).toEqual(3);
			expect(results).toEqual([
				{
					"id": mockAPIImages[0].id,
					"url": mockAPIImages[0].url,
					"width": mockAPIImages[0].width,
					"height": mockAPIImages[0].height
				},
				{
					"id": mockAPIImages[1].id,
					"url": mockAPIImages[1].url,
					"width": mockAPIImages[1].width,
					"height": mockAPIImages[1].height
				},
				{
					"id": mockAPIImages[2].id,
					"url": mockAPIImages[2].url,
					"width": mockAPIImages[2].width,
					"height": mockAPIImages[2].height
				}
			]);

			expect(ApiHelper.get).toBeCalledTimes(1);
		});

		it('throws an error if null', () => {
			jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);
			expect(() => ImageService.getImages(0, limit)).rejects.toThrow(Error);
		});
	});

	describe('uploadImage', () => {
		it('Post image with empty list', async () => {
			jest.spyOn(ApiHelper, 'post').mockResolvedValue(mockNewAPIImage1);
			const result = await ImageService.uploadImage(mockImage);

			expect(result).toEqual({
				"id": mockNewAPIImage1.id,
				"url": mockNewAPIImage1.url,
				"width": mockNewAPIImage1.width,
				"height": mockNewAPIImage1.height
			});

			expect(ApiHelper.post).toBeCalledTimes(1);
		});

		it('throws an error if null', () => {
			jest.spyOn(ApiHelper, 'post').mockResolvedValue(null);
			expect(() => ImageService.uploadImage(mockImage)).rejects.toThrow(Error);
		});
	});
});