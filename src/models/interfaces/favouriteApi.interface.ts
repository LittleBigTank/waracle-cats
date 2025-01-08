export default interface FavouriteApiInterface {
	id: number;
	user_id?: string;
	image_id: string;
	sub_id: string;
	created_at?: Date;
	image?: FavouriteImageApiInterface;
}

interface FavouriteImageApiInterface {
	id: string;
	url: string;
}