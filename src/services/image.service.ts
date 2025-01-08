import ApiHelper, { ContentType } from '../helpers/api.helper';

// models
import ImageModel from '../models/image.model';
import ImageApiInterface from '../models/interfaces/imageApi.interface';

class ImageService {
	getImages = (page: number, limit: number): Promise<Array<ImageModel>> => {
		return ApiHelper.get({
			url: `/v1/images?limit=${limit}&page=${page}`
		})
		.catch(() => {
			return null;
		})
		.then((data: Array<ImageModel>) => {
			return data.map(x => {
				return new ImageModel(x);
			});
		})
	};

	uploadImage = (file: File): Promise<ImageModel> => {
		const formData = new FormData();
		formData.append('file', file);

		return ApiHelper.post({
			url: '/v1/images/upload',
			contentType: ContentType.MultipartForm,
			body: formData
		})
		.then((data: ImageApiInterface) => {
			return new ImageModel(data);
		});
	}
}

export default new ImageService();