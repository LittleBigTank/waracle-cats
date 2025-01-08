import { waitFor } from '@testing-library/react';
import { interact, render } from '../../test/render';

// components
import UserForm from './user-form.component';

describe('UserForm', () => {
	it('Render correctly', async () => {
		const {	renderResult: { container }	}  = await render(
			<UserForm />,
		);

		const ps = container.querySelectorAll('p');
		const labels = container.querySelectorAll('label');
		const inputs = container.querySelectorAll('input');
		const buttons = container.querySelectorAll('button');

		// tests
		expect(ps.length).toEqual(1);
		expect(ps[0].innerHTML).toEqual('Your user id is <span class="whitespace-nowrap">four digits</span>');
		expect(labels.length).toEqual(1);
		expect(labels[0].innerHTML).toEqual('User Id');
		expect(inputs.length).toEqual(1);
		expect(inputs[0].id).toEqual('userId');
		expect(inputs[0].value).toEqual('1234');
		expect(buttons.length).toEqual(1);
		expect(buttons[0].innerHTML).toEqual('Submit');
	});

	it('Update userId', async () => {
		const {	renderResult: { container }	}  = await render(
			<UserForm />,
		);

		let ps = container.querySelectorAll('p');
		const input = container.querySelectorAll('input')[0];
		const submit = container.querySelectorAll('button')[0];

		// tests
		expect(ps.length).toEqual(1);
		expect(input.id).toEqual('userId');
		expect(input).toHaveValue(1234);

		// update
		await interact.type(input, '1222', {clear: true});
		await waitFor(async () => {
			expect(input).toHaveValue(1222);
		});

		// click
		await interact.click(submit);
		await waitFor(async () => {
			ps = container.querySelectorAll('p');
			expect(ps.length).toEqual(2);
			expect(ps[1].innerHTML).toEqual('Successfully updated');
			expect(ps[1].classList).not.toContain('text-red');
		});
	});

	it('Invalid userId', async () => {
		const {	renderResult: { container }	}  = await render(
			<UserForm />,
		);

		let ps = container.querySelectorAll('p');
		const input = container.querySelectorAll('input')[0];
		const submit = container.querySelectorAll('button')[0];

		// tests
		expect(ps.length).toEqual(1);
		expect(input.id).toEqual('userId');
		expect(input).toHaveValue(1234);

		// update
		await interact.type(input, '1', {clear: true});
		await waitFor(async () => {
			expect(input).toHaveValue(1);
		});

		// click
		await interact.click(submit);
		await waitFor(async () => {
			ps = container.querySelectorAll('p');
			expect(ps.length).toEqual(2);
			expect(ps[1].innerHTML).toEqual('User Id must be four digits');
			expect(ps[1].classList).toContain('text-red');
		});
	});
});
