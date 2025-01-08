import FavouriteApiInterface from "./interfaces/favouriteApi.interface";

export default class FavouriteModel {
	id: number;
	imageId: string
	userId: string;

	constructor({id, image_id, sub_id}: FavouriteApiInterface) {
		this.id = id;
		this.imageId = image_id;
	    this.userId = sub_id;
	}
}