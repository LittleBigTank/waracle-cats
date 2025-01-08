import axios from "axios";

export interface ApiOptions {
	url: string;
	timeout?: number;
	contentType?: ContentType;
	body?: any;
}

export enum ContentType {
	JSON = 'application/json',
	MultipartForm = 'multipart/form-data',
};

enum ApiMethod {
	DELETE,
	GET,
	POST,
};

class ApiHelper {
	private defaultTimeout = 10;
	private apiKey = process.env.REACT_APP_API_KEY;
	private apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

	public delete = (options: ApiOptions): Promise<any> => {
		return this.send(options, ApiMethod.DELETE);
	}

	public get = (options: ApiOptions): Promise<any> => {
		return this.send(options, ApiMethod.GET);
	}

	public post = (options: ApiOptions): Promise<any> => {
		return this.send(options, ApiMethod.POST);
	}

	private send = (options: ApiOptions, method: ApiMethod): Promise<any> => {
		if (!options) {
			return Promise.reject(new Error('options must be an object'));
		}
		if (!options.url || options.url.length === 0) {
			return Promise.reject(new Error('options.url is not defined'));
		}
		if (method === ApiMethod.POST && !options.body) {
			return Promise.reject(new Error('options.body is not defined'));
		}

		return this.runSend(options, method);
	}

	private runSend = (options: ApiOptions, method: ApiMethod): Promise<any> => {
		const promise = this.getPromise(options, method);
		
		return this.promiseTimeout(promise, options.timeout ?? this.defaultTimeout)
			.then(async (data: any) => {
				if (data.status >= 400 && data.status < 600) {
					throw new Error(`${data.status} - ${data.code} - ${data.message}`);
				}

				return data.data;
			})
			.catch(function (error) {
				if (error === 'mocked') return;
				throw new Error(error);
			});
	}

	private getPromise = (options: ApiOptions, method: ApiMethod): Promise<any> => {
		const url = `${this.apiBaseUrl}${options.url}`;

		switch (method) {
			case ApiMethod.GET:
				return axios.get(url, {
					headers: this.getHeaders(options.contentType)
				});
				
			case ApiMethod.POST:
				return axios.post(url,
					options.body, {
					headers: this.getHeaders(options.contentType)
				});

			case ApiMethod.DELETE:
				return axios.delete(url, {
					headers: this.getHeaders(options.contentType)
				});

			default:
				throw new Error('Invalid Api Method');
		}
	}

	private getHeaders = (contentType?: string): any => {
		return {
			"content-type": contentType ?? ContentType.JSON,
			'x-api-key': this.apiKey
		};
	}

	public promiseTimeout = (promise: any, timeout: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject('timeout');
			}, timeout * 1000);

			promise.then(resolve, reject);
		});
	};
}

export default new ApiHelper();