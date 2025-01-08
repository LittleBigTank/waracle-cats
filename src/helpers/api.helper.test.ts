import axios from 'axios';
import ApiHelper, { ContentType } from './api.helper';

jest.mock("axios");

describe('API Helper', () => {
	it('returns a rejection if fetch timesout', async () => {
		const p = new Promise((resolve) => {
			setTimeout(() => {
				resolve('winner');
			}, 1500);
		});
		const promiseTimeout = ApiHelper.promiseTimeout(p, 1);
		await expect(promiseTimeout).rejects.toEqual('timeout');
	});

	it('fails to post if body is null', async () => {
		const fetch = ApiHelper.post({
			url: 'https://www.bbc.co.uk'
		});
		await expect(fetch).rejects.toThrow(Error);
		expect(fetch).rejects.toThrowError('options.body is not defined');
	});

	it('throws an error if timeout returns status between 400 and 600', async () => {
		jest.spyOn(ApiHelper, 'promiseTimeout').mockResolvedValue({
			status: 400,
			code: 'ERR_BAD_REQUEST',
			message: 'Request failed with status code 400',
		});
		
		const response = ApiHelper.get({
			url: '/endpoint'
		});
		await expect(response).rejects.toThrow(Error);
		expect(response).rejects.toThrowError('Error: 400 - ERR_BAD_REQUEST - Request failed with status code 400');
	});
	
	it('calls axios delete when delete is called', async () => {
		axios.delete = jest.fn().mockResolvedValue(Promise.resolve({ data: []}));
		
		ApiHelper.delete({
			url: '/endpoint1'
		});
		expect(axios.delete).toHaveBeenCalled();
		expect(axios.delete).toHaveBeenCalledWith("http://localhost/endpoint1", {"headers": {"content-type": "application/json", "x-api-key": "ABC1234"}});
		expect(axios.get).not.toHaveBeenCalled();
		expect(axios.post).not.toHaveBeenCalled();
	});

	it('calls axios get when get is called', async () => {
		axios.get = jest.fn().mockResolvedValue(Promise.resolve({ data: []}));

		ApiHelper.get({
			url: '/endpoint2'
		});
		expect(axios.delete).not.toHaveBeenCalled();
		expect(axios.get).toHaveBeenCalled();
		expect(axios.get).toHaveBeenCalledWith("http://localhost/endpoint2", {"headers": {"content-type": "application/json", "x-api-key": "ABC1234"}});
		expect(axios.post).not.toHaveBeenCalled();
	});

	it('calls axios post when post is called', async () => {
		axios.post = jest.fn().mockResolvedValue(Promise.resolve({ data: []}));
		
		ApiHelper.post({
			url: '/endpoint3',
			contentType: ContentType.MultipartForm,
			body: {
				file: '12345678',
				userId: 'W123'
			}
		});
		expect(axios.delete).not.toHaveBeenCalled();
		expect(axios.get).not.toHaveBeenCalled();
		expect(axios.post).toHaveBeenCalled();
		expect(axios.post).toHaveBeenCalledWith("http://localhost/endpoint3", {"file": "12345678", "userId": "W123"}, {"headers": {"content-type": "multipart/form-data", "x-api-key": "ABC1234"}});
	});
});