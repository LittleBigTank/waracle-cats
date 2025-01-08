import ImageApiInterface from "./interfaces/imageApi.interface";

export default class ImageModel {
	id: string;
	url: string;
    width: number;
    height: number;

	constructor({id, url, width, height}: ImageApiInterface) {
		this.id = id;
	    this.url = url;
        this.width = width;
        this.height = height;
	}
}