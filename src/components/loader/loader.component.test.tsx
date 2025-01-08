import { render } from '../../test/render';

// components
import Loader from './loader.component';

describe('Loader', () => {
	it('Render correctly - size 10', async () => {
		const {	renderResult: { container }	}  = await render(
			<Loader size={10} />,
		);

		const svg = container.querySelector('svg');

		// tests
		expect(svg!.getAttribute('style')).toEqual('width: 10px; height: 10px;');
	});

	it('Render correctly - size 20', async () => {
		const {	renderResult: { container }	}  = await render(
			<Loader size={20} />,
		);

		const svg = container.querySelector('svg');

		// tests
		expect(svg!.getAttribute('style')).toEqual('width: 20px; height: 20px;');
	});
});
