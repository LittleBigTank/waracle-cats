import { render } from '../../test/render';

// components
import Footer from './footer.component';

describe('Header', () => {
	it('Render correctly', async () => {
		const copyright = `© Cats ${new Date().getFullYear()}`;
		const {	renderResult: { container }	}  = await render(
			<Footer />,
		);

		const element = container.querySelector('footer');
		
		// tests
		expect(element).toBeDefined();
		expect(element!.classList).toContain('min-w-[320px]');
		expect(element!.classList).toContain('h-[60px]');
		expect(element!.classList).toContain('text-center');
		expect(element!.classList).toContain('text-white');
		expect(element!.classList).toContain('bg-dark-blue');
		expect(element!.classList).toContain('p-5');
		expect(element!.innerHTML).toEqual(copyright);
	});
});
