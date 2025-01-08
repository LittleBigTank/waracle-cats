import VoteAPIInterface from "./interfaces/voteAPI.interface";

export default class VoteModel {
	id: number;
	imageId: string
	userId: string;
	value: number;

	constructor({id, image_id, sub_id, value}: VoteAPIInterface) {
		this.id = id;
		this.imageId = image_id;
	    this.userId = sub_id;
		this.value = value;
	}
}