module.exports = {
	setupFilesAfterEnv: [
		'./node_modules/jest-enzyme/lib/index.js',
		'<rootDir>assets/js/tests/setup.js' ],
	testPathIgnorePatterns: [
		'/node_modules/',
		'<rootDir>/webpack/'
	],
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	preset: '@wordpress/jest-preset-default',
	moduleNameMapper: {
		'@wordpress\\/(blocks|components|date|editor|element|data|utils|edit-post|viewport|plugins|core-data|block-editor)': '<rootDir>/node_modules/@wordpress/$1',
	},
	moduleDirectories: ['node_modules', 'assets/js' ],
};
