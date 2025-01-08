import {isFulfilled, isRejected} from './function.helper';

describe('Funtion Helper', () => {
	describe('isFulfilled', () => {
		it('isFulfilled', () => {
			expect(isFulfilled('fetch-images/fulfilled')).toBeTruthy();
            expect(isFulfilled('fetch-images/rejected')).toBeFalsy();
            expect(isFulfilled('')).toBeFalsy();
		});

		it('isRejected', () => {
			expect(isRejected('fetch-images/fulfilled')).toBeFalsy();
            expect(isRejected('fetch-images/rejected')).toBeTruthy();
            expect(isRejected('')).toBeFalsy();
		});
	});
});
