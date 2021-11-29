const { Test } = require('../../database').models;

module.exports = {
	command: 'test',
	onlyAdmin: false,

	async run(client, message, args) {

		const test = await Test.findOne({
			where: {
				message: 'test',
			},
		});

		message.channel.send('Hello World!');
	},
};
