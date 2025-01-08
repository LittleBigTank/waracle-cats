import { waitFor } from '@testing-library/react';
import { createDefaultReduxState, interact, render } from '../../test/render';
import ApiHelper from '../../helpers/api.helper';

// components
import Favourite from './favourite.component';

// mocks
import { mockImages } from '../../test/images.mock';
import { mockFavourites } from '../../test//favourites.mock';

const userId = 'W1234';

describe('Favourite', () => {
	it('Render favourited correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<Favourite imageId={mockImages[0].id} />,
		);

		const svgs = container.querySelectorAll('svg');

		// tests
		expect(svgs.length).toEqual(1);
		expect(svgs[0].innerHTML).toEqual('heart.svg');
		expect(svgs[0].classList.length).toEqual(4);
		expect(svgs[0].classList).toContain('cursor-pointer');
		expect(svgs[0].classList).toContain('stroke-red');
		expect(svgs[0].classList).toContain('fill-red');
		expect(svgs[0].classList).toContain('h-6');
	});

	it('Render non-favourited correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<Favourite imageId={mockImages[1].id} />,
		);

		const svgs = container.querySelectorAll('svg');

		// tests
		expect(svgs.length).toEqual(1);
		expect(svgs[0].innerHTML).toEqual('heart.svg');
		expect(svgs[0].classList.length).toEqual(3);
		expect(svgs[0].classList).toContain('cursor-pointer');
		expect(svgs[0].classList).toContain('stroke-dark-blue');
		expect(svgs[0].classList).toContain('h-6');
	});

	it('Render loading error', async () => {
		const reduxState = createDefaultReduxState();
		reduxState.favourites.error = new Error();
		const {	renderResult: { container }	}  = await render(
			<Favourite imageId={mockImages[1].id} />,
			{reduxState}
		);

		const svgs = container.querySelectorAll('svg');

		// tests
		expect(svgs.length).toEqual(1);
		expect(svgs[0].innerHTML).toEqual('error.svg');
		expect(svgs[0].classList.length).toEqual(3);
		expect(svgs[0].classList).toContain('cursor-pointer');
		expect(svgs[0].classList).toContain('stroke-red');
		expect(svgs[0].classList).toContain('h-6');
	});

	it('Render loading', async () => {
		const reduxState = createDefaultReduxState();
		reduxState.favourites.payload = [];
		reduxState.favourites.loading = true;
		reduxState.favourites.error = null;
		const {	renderResult: { container }	}  = await render(
			<Favourite imageId={mockImages[1].id} />,
			{reduxState}
		);

		const svgs = container.querySelectorAll('svg');

		// tests
		expect(svgs.length).toEqual(1);
		expect(svgs[0].innerHTML).toContain('<path');
		expect(svgs[0].classList.length).toEqual(5);
		expect(svgs[0].classList).toContain('inline');
		expect(svgs[0].classList).toContain('-mt-1');
		expect(svgs[0].classList).toContain('text-white');
		expect(svgs[0].classList).toContain('animate-spin');
		expect(svgs[0].classList).toContain('fill-dark-blue');
	});

	it('Add favourite', async () => {
		jest.spyOn(ApiHelper, 'post').mockResolvedValue({
			"id": 12345678,
			"user_id": userId,
			"image_id": mockImages[1].id
		});

		const {	renderResult: { container }	}  = await render(
			<Favourite imageId={mockImages[1].id} />
		);

		let svg = container.querySelectorAll('svg')[0] as unknown as HTMLElement;

		// tests
		expect(svg.innerHTML).toEqual('heart.svg');
		expect(svg.classList).toContain('stroke-dark-blue');

		// click
		interact.click(svg);
		await waitFor(async () => {
			svg = container.querySelectorAll('svg')[0] as unknown as HTMLElement;
			expect(svg.innerHTML).toEqual('heart.svg');
			expect(svg.classList).toContain('stroke-red');
			expect(svg.classList).toContain('fill-red');
		});

		// calls made
		expect(ApiHelper.post).toHaveBeenCalledWith({
			url: "/v1/favourites",
			body:{
				"image_id": mockImages[1].id,
				"sub_id": userId
			},
		});
	});

	it('Remove favourite', async () => {
		jest.spyOn(ApiHelper, 'delete').mockResolvedValue({});

		const {	renderResult: { container }	}  = await render(
			<Favourite imageId={mockImages[0].id} />
		);

		let svg = container.querySelectorAll('svg')[0] as unknown as HTMLElement;

		// tests
		expect(svg.innerHTML).toEqual('heart.svg');
		expect(svg.classList).toContain('stroke-red');
		expect(svg.classList).toContain('fill-red');

		// click
		interact.click(svg);
		await waitFor(async () => {
			svg = container.querySelectorAll('svg')[0] as unknown as HTMLElement;
			expect(svg.classList).toContain('stroke-dark-blue');
		});

		// calls made
		expect(ApiHelper.delete).toHaveBeenCalledWith({
			url: `/v1/favourites/${mockFavourites[0].id}`
		});
	});
});