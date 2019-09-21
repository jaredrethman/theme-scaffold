
/**
 * @param {Boolean} error
 * @returns {string}
 */
export const testFn = ( error = false ) => {
	// eslint-disable-next-line no-console
	console.log( `%c${error ? ' There appears to be an error, captain! ' : ' All systems go '}`, `background:${error ? '#ff0000' : '#00d084'};color:#ffffff;font-size:22px` );
};
/**
 * @param {Number} num
 * @returns {string}
 */
export const testFnTwo = ( num = 0 ) => {
	// eslint-disable-next-line no-console
	console.log( `%c Counter ${num} `, `background:${( 0 === num % 2 ) ? '#ff3f71' : '#ffcc3d'};color:#ffffff;font-size:22px` );
};

export default {
	testFn,
	testFnTwo
};
