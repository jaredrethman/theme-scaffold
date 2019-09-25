module.exports = {
	'presets': [
		[
			'@babel/preset-env',
			{
				corejs: 3,
				useBuiltIns: 'usage',
				shippedProposals: true,
			}
		],
		'@babel/preset-react',
		'@wordpress/default'
	],
};
