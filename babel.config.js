module.exports = {
	'presets': [
		[
			'@babel/preset-env',
			{
				corejs: '3.0.0',
				useBuiltIns: 'usage',
				shippedProposals: true,
			}
		],
		'@babel/preset-react',
		'@wordpress/default'
	]
};
