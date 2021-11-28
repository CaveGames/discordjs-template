module.exports = {
	command: 'test',
	onlyAdmin: false,

	async run(client, message, args) {
		message.channel.send('Test command works');
	},
};
