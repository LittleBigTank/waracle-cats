export default interface VoteAPIInterface {
	id: number;
	user_id?: string;
	image_id: string;
	sub_id: string;
	created_at?: Date;
	value: number;
	country_code?: string;
	image?: VoteImageApiInterface;
}

interface VoteImageApiInterface {
	id: string;
	url: string;
}