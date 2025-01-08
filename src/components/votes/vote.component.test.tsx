import { waitFor } from '@testing-library/react';
import { createDefaultReduxState, interact, render } from '../../test/render';
import ApiHelper from '../../helpers/api.helper';

// components
import Vote from './vote.component';

// mocks
import { mockImages } from '../../test/images.mock';
import { mockAPIVotes } from '../../test/votes.mock';

const userId = 'W1234';

describe('Vote', () => {
	it('Render vote count correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<Vote imageId={mockImages[0].id} />,
		);

		const spans = container.querySelectorAll('span');
		const svgs = container.querySelectorAll('svg');

		// tests
		expect(spans.length).toEqual(1);
		expect(spans[0].innerHTML).toEqual('2');
		expect(svgs.length).toEqual(2);
	});

	it('Render vote count correctly - multiple user votes', async () => {
		const {	renderResult: { container }	}  = await render(
			<Vote imageId={mockImages[1].id} />,
		);

		const spans = container.querySelectorAll('span');
		const svgs = container.querySelectorAll('svg');

		// tests
		expect(spans.length).toEqual(1);
		expect(spans[0].innerHTML).toEqual('2');
		expect(svgs.length).toEqual(2);
	});

	it('Render unfound image', async () => {
		const {	renderResult: { container }	}  = await render(
			<Vote imageId='1234' />,
		);

		const spans = container.querySelectorAll('span');
		const svgs = container.querySelectorAll('svg');

		// tests
		expect(spans.length).toEqual(1);
		expect(spans[0].innerHTML).toEqual('0');
		expect(svgs.length).toEqual(2);
	});

	it('Render loading error', async () => {
		const reduxState = createDefaultReduxState();
		reduxState.votes.error = new Error();
		const {	renderResult: { container }	}  = await render(
			<Vote imageId='1234' />,
			{reduxState}
		);

		const spans = container.querySelectorAll('span');
		const svgs = container.querySelectorAll('svg');

		// tests
		expect(spans.length).toEqual(0);
		expect(svgs.length).toEqual(1);
		expect(svgs[0].innerHTML).toEqual('error.svg');
		expect(svgs[0].classList.length).toEqual(3);
		expect(svgs[0].classList).toContain('cursor-pointer');
		expect(svgs[0].classList).toContain('stroke-red');
		expect(svgs[0].classList).toContain('h-6');
	});

	it('Render loading', async () => {
		const reduxState = createDefaultReduxState();
		reduxState.votes.payload = null;
		reduxState.votes.loading = true;
		reduxState.votes.error = null;
		const {	renderResult: { container }	}  = await render(
			<Vote imageId={mockImages[0].id} />,
			{reduxState}
		);

		const spans = container.querySelectorAll('span');
		const svgs = container.querySelectorAll('svg');

		// tests
		expect(spans.length).toEqual(1);
		expect(spans[0].innerHTML).toEqual('Loading');
		expect(svgs.length).toEqual(1);
		expect(svgs[0].innerHTML).toContain('<path');
		expect(svgs[0].classList.length).toEqual(5);
		expect(svgs[0].classList).toContain('inline');
		expect(svgs[0].classList).toContain('-mt-1');
		expect(svgs[0].classList).toContain('text-white');
		expect(svgs[0].classList).toContain('animate-spin');
		expect(svgs[0].classList).toContain('fill-dark-blue');
	});

	it('Upvote', async () => {
		jest.spyOn(ApiHelper, 'post').mockResolvedValue({
			"image_id": mockImages[0].id,
			"user_id": userId,
			"value": 3
		});
		jest.spyOn(ApiHelper, 'get').mockResolvedValue(
			[...mockAPIVotes.filter(x => x.image_id !== mockImages[0].id),
			{
				"image_id": mockImages[0].id,
				"user_id": userId,
				"value": 3
			}]);

		const {	renderResult: { container }	}  = await render(
			<Vote imageId={mockImages[0].id} />,
		);

		let spans = container.querySelectorAll('span');
		const svgs = container.querySelectorAll('svg');

		// tests
		expect(spans.length).toEqual(1);
		expect(spans[0].innerHTML).toEqual('2');
		expect(svgs.length).toEqual(2);

		// click
		interact.click(svgs[0] as unknown as HTMLElement);
		await waitFor(async () => {
			spans = container.querySelectorAll('span');
			expect(spans[0].innerHTML).toEqual('3');
		});

		// calls made
		expect(ApiHelper.post).toHaveBeenCalledWith({
			url: "/v1/votes",
			body:{
				"image_id": mockImages[0].id,
				"sub_id": userId,
				"value": 3 // up
			},
		});
	});

	it('Downvote', async () => {
		jest.spyOn(ApiHelper, 'post').mockResolvedValue({
			"image_id": mockImages[0].id,
			"user_id": userId,
			"value": 1
		});
		jest.spyOn(ApiHelper, 'get').mockResolvedValue(
			[...mockAPIVotes.filter(x => x.image_id !== mockImages[0].id),
			{
				"image_id": mockImages[0].id,
				"user_id": userId,
				"value": 1
			}]);

		const {	renderResult: { container }	}  = await render(
			<Vote imageId={mockImages[0].id} />,
		);

		let spans = container.querySelectorAll('span');
		const svgs = container.querySelectorAll('svg');

		// tests
		expect(spans.length).toEqual(1);
		expect(spans[0].innerHTML).toEqual('2');
		expect(svgs.length).toEqual(2);

		// click
		interact.click(svgs[1] as unknown as HTMLElement);
		await waitFor(async () => {
			spans = container.querySelectorAll('span');
			expect(spans[0].innerHTML).toEqual('1');
		});

		// calls made
		expect(ApiHelper.post).toHaveBeenCalledWith({
			url: "/v1/votes",
			body:{
				"image_id": mockImages[0].id,
				"sub_id": userId,
				"value": 1 // down
			},
		});
	});
});