import { render } from '../../test/render';

// components
import Cat from './cat.component';

// mocks
import { mockImages } from '../../test/images.mock';

describe('Cat', () => {
	it('Render correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<Cat id={mockImages[0].id} />,
		);

		const imgs = container.querySelectorAll('img');
		const svgs = container.querySelectorAll('svg');
		const ps = container.querySelectorAll('p');

		// tests
		expect(imgs.length).toEqual(1);
		expect(svgs.length).toEqual(3);
		expect(svgs[0].innerHTML).toEqual('vote-up.svg');
		expect(svgs[1].innerHTML).toEqual('vote-down.svg');
		expect(svgs[2].innerHTML).toEqual('heart.svg');
		expect(ps.length).toEqual(0);
	});

	it('Render unfound correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<Cat id='1234' />,
		);

		const imgs = container.querySelectorAll('img');
		const svgs = container.querySelectorAll('svg');
		const ps = container.querySelectorAll('p');

		// tests
		expect(imgs.length).toEqual(0);
		expect(svgs.length).toEqual(0);
		expect(ps.length).toEqual(1);
		expect(ps[0].innerHTML).toEqual('Cat Not Found');
	});
});
