import { waitFor } from '@testing-library/react';
import { interact, render } from '../../test/render';

// components
import UploadForm from './upload-form.component';

// mocks
const mockImage = new File(['1234'], 'cat.jpg', {
	type: 'image/jpeg',
});
const mockPDF = new File(['1234'], 'cat.pdf', {
	type: 'application/pdf',
});

describe('UserForm', () => {
	it('Render correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<UploadForm />,
		);

		const ps = container.querySelectorAll('p');
		const labels = container.querySelectorAll('label');
		const inputs = container.querySelectorAll('input');
		const buttons = container.querySelectorAll('button');

		// tests
		expect(ps.length).toEqual(1);
		expect(ps[0].innerHTML).toEqual('Please upload your photo as <span class="whitespace-nowrap">a jpg</span>');
		expect(labels.length).toEqual(1);
		expect(labels[0].innerHTML).toEqual('File');
		expect(inputs.length).toEqual(1);
		expect(inputs[0].id).toEqual('file');
		expect(inputs[0].value).toEqual('');
		expect(buttons.length).toEqual(1);
		expect(buttons[0].innerHTML).toEqual('<span class="block py-[3px]">Submit</span>');
	});

	it('No file', async () => {
		const {	renderResult: { container }	}  = await render(
			<UploadForm />,
		);

		let ps = container.querySelectorAll('p');
		const submit = container.querySelectorAll('button')[0];

		// tests
		expect(ps.length).toEqual(1);

		// click
		await interact.click(submit);
		await waitFor(async () => {
			ps = container.querySelectorAll('p');
			expect(ps.length).toEqual(2);
			expect(ps[1].innerHTML).toEqual('Please select a file');
			expect(ps[1].classList).toContain('text-red');
		});
	});

/*
	it('Invalid file type', async () => {
		const {	renderResult: { container }	}  = await render(
			<UploadForm />,
		);

		const input = container.querySelectorAll('input')[0];
		const submit = container.querySelectorAll('button')[0];
		console.log(input.value);

		await interact.upload(input, mockPDF);
		await waitFor(async () => {
			console.log(input.value);
			expect(input).toHaveValue(1222);
		});

		await interact.click(submit);
		
		console.log(container.innerHTML);
	});
	TODO: get upload working
*/
});
