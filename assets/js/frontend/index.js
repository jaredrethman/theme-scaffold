if ( module.hot ) {
	module.hot.accept();
}

import {testFn, testFnTwo} from '../shared';

testFn( true );
testFnTwo( 3 );
