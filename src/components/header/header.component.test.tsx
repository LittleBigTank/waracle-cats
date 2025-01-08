import { render } from '../../test/render';

// components
import Header from './header.component';

describe('Header', () => {
	it('Render correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<Header />,
		);

		const links = container.querySelectorAll('a');

		// tests
		expect(links.length).toEqual(3);
		expect(links[0].innerHTML).toEqual('<h1>CATS</h1>');
		expect(links[0].getAttribute('href')).toEqual('/');
		expect(links[1].innerHTML).toEqual('<svg class=\"inline-block\" stroke=\"#fff\">user.svg</svg>W1234');
		expect(links[1].getAttribute('href')).toEqual('/user');
		expect(links[2].innerHTML).toEqual('<svg class=\"inline-block\" stroke=\"#fff\">upload.svg</svg>Upload');
		expect(links[2].getAttribute('href')).toEqual('/upload');
	});
});
