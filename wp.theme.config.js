module.exports = {
	devUrl: 'http://10pl8.test/',
	stats: {
		all: false,
		errors: true,
		maxModules: 0,
		modules: true,
		warnings: true,
		assets: true,
		errorDetails: true,
		excludeAssets: /\.(jpe?g|png|gif|svg|woff|woff2)$/i,
		moduleTrace: true,
		performance: true
	},
	'entries': [
		{
			'name': 'admin',
			'js': [ './assets/js/admin' ],
			'css': [ './assets/css/admin' ],
		},
		{
			'name': 'blocks-editor',
			'js': [ './assets/js/blocks' ],
			'css': [ './assets/css/blocks' ],
			'react': true
		},
		{
			'name': 'shared',
			'js': [ './assets/js/shared' ],
			'css': [ './assets/css/shared' ]
		},
		{
			'name': 'frontend',
			'js': [ './assets/js/frontend' ],
			'css': [ './assets/css/frontend' ]
		},
		{
			'name': 'style-guide',
			'js': [ './assets/js/style-guide' ],
			'css': [ './assets/css/style-guide' ]
		}
	],
	'options': {
		'port': 4000,
		'browserSync': {
			host: 'localhost',
			port: 3000,
			proxy: 'http://10pl8.test',
			open: false,
			files: [
				'**/*.php',
				'dist/**/*.js',
				'dist/**/*.css',
				'dist/**/*.svg',
				'dist/**/*.{jpg,jpeg,png,gif}',
				'dist/**/*.{eot,ttf,woff,woff2,svg}'
			]
		}
	},
	'purgeCss': [
		'url-loader-test-png'
	]
};
