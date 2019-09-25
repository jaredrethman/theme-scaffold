/**
 * Shared functions
 *
 * @package TenUpScaffold
 */

// @TODO Delete below, these are purely for demo purposes.

/**
 * @param {Boolean} error
 * @returns {string}
 */
export const testFn = ( error = false ) => {
	// eslint-disable-next-line no-console
	console.log( `%c${error ? ' There appears to be an error, captain! ' : ' All systems go '}`, `background:${error ? '#ff0000' : '#22d049'};color:#ffffff;font-size:22px` );
};
/**
 * @param {Number} num
 * @returns {string}
 */
export const testFnTwo = ( num = 0 ) => {
	// eslint-disable-next-line no-console
	console.log( `%c Counter ${num} `, `background:${( 0 === num % 2 ) ? '#ff3f71' : '#ffcc3d'};color:#ffffff;font-size:22px` );
};

/**
 * @param variable
 * @param __instanceOf
 * @returns {"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
export const testFnThree = ( variable, __instanceOf = null ) => {
	if( null !== __instanceOf ){
		return variable instanceof __instanceOf;
	}
	return typeof variable;
};

export default {
	testFn,
	testFnTwo,
	testFnThree
};

if( module.hot ){
	module.hot.accept();
}
