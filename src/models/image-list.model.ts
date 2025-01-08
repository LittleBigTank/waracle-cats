import ImageModel from "./image.model";

export default interface ImageListModelConstructor {
	images: Array<ImageModel>;
	more: boolean;
}

export default class ImageListModel {
	images: Array<ImageModel>;
	more: boolean;

	constructor({images, more}: ImageListModelConstructor) {
		this.images = images;
	    this.more = more;
	}
}