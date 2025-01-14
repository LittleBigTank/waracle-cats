export default interface ImageApiInterface {
	id: string;
	url: string;
    width: number;
    height: number;
    sub_id?: string;
    created_at?: Date;
    original_filename?: string;
}