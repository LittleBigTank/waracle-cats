import { mockImages } from '../test/images.mock';
import { createDefaultReduxState, render } from '../test/render';
import ApiHelper from '../helpers/api.helper';

// components
import HomePage from './home.page';

describe('HomePage', () => {
	it('Render correctly', async () => {
		jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);

		const {	renderResult: { container }	}  = await render(
			<HomePage />,
		);

		const imgs = container.querySelectorAll('img');
		const ps = container.querySelectorAll('ps');

		// tests
		expect(imgs.length).toEqual(3);
		expect(imgs[0].getAttribute('src')).toEqual(mockImages[0].url);
		expect(imgs[1].getAttribute('src')).toEqual(mockImages[1].url);
		expect(imgs[2].getAttribute('src')).toEqual(mockImages[2].url);
		expect(ps.length).toEqual(0);

		// calls made
		expect(ApiHelper.get).not.toHaveBeenCalled();
	});

	it('Render correctly - no cats', async () => {
		jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);

		const reduxState = createDefaultReduxState();
		reduxState.imageList.payload = {
			images: [],
			more: false
		};
		const {	renderResult: { container }	}  = await render(
			<HomePage />,
			{reduxState}
		);

		const imgs = container.querySelectorAll('img');
		const ps = container.querySelectorAll('p');

		// tests
		expect(imgs.length).toEqual(0);
		expect(ps.length).toEqual(1);
		expect(ps[0].innerHTML).toEqual('No Cats');

		// calls made
		expect(ApiHelper.get).not.toHaveBeenCalled();
	});

	it('Render correctly - loading', async () => {
		jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);

		const reduxState = createDefaultReduxState();
		reduxState.imageList.payload = {
			images: [],
			more: false
		};
		reduxState.imageList.loading = true;
		const {	renderResult: { container }	}  = await render(
			<HomePage />,
			{reduxState}
		);

		let svg = container.querySelector('svg');

		// tests
		expect(svg).toBeDefined();
		expect(svg!.innerHTML).toContain('<path');
		expect(svg!.classList).toContain('animate-spin');
		expect(svg!.classList).toContain('fill-dark-blue');

		// calls made
		expect(ApiHelper.get).not.toHaveBeenCalled();
	});

	it('Render correctly - error', async () => {
		jest.spyOn(ApiHelper, 'get').mockResolvedValue(null);

		const reduxState = createDefaultReduxState();
		reduxState.imageList.payload = null;
		reduxState.imageList.error = new Error();
		const {	renderResult: { container }	}  = await render(
			<HomePage />,
			{reduxState}
		);

		let svg = container.querySelector('svg');

		// tests
		expect(svg).toBeDefined();
		expect(svg!.innerHTML).toEqual('error.svg');

		// calls made
		expect(ApiHelper.get).toHaveBeenCalledWith({
			url: "/v1/images?limit=6&page=0"
		});
		expect(ApiHelper.get).toHaveBeenCalledWith({
			url: "/v1/favourites"
		});
		expect(ApiHelper.get).toHaveBeenCalledWith({
			url: "/v1/votes"
		});
	});
});