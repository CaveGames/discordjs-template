module.exports = {
	name: 'messageCreate',

	async run(client, message) {
		if (message.author.bot) return;
		if (message.content.startsWith(client.prefix)) {
			const [cmdName, ...cmdArgs] = message.content.slice(client.prefix.length).trim().split(/\s+/);
			const command = client.commands.get(cmdName);
			if (command) {
				command(client, message, cmdArgs);
			}
		}
	},
};
