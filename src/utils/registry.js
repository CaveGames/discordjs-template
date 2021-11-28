const path = require('path');
const fs = require('fs').promises;

async function registerCommands(client, dir = '') {
	const filePath = path.join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(path.join(filePath, file));
		if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
		if (file.endsWith('.js')) {
			const cmd = require(path.join(filePath, file));
			client.commands.set(cmd.command, function(cmdClient, cmdMessage, cmdArgs) {
				runCmd(cmd, cmdClient, cmdMessage, cmdArgs);
			});

			if (cmd.aliases) {
				cmd.aliases.forEach(alias => {
					client.commands.set(alias, function(cmdClient, cmdMessage, cmdArgs) {
						runCmd(cmd, cmdClient, cmdMessage, cmdArgs);
					});
				});
			}
		}
	}
}

function runCmd(cmd, cmdClient, cmdMessage, cmdArgs) {
	if (process.env.BOT_ADMIN_ROLE_ID && cmd.onlyAdmin) {
		if (cmdMessage.member.roles.cache.get(process.env.BOT_ADMIN_ROLE_ID) == null) return;
	}
	else if (process.env.BOT_BOTCHANNEL_ID && process.env.BOT_BOTCHANNEL_ID != '') {
		if (cmdMessage.channelId != process.env.BOT_BOTCHANNEL_ID) return;
	}

	cmd.run(cmdClient, cmdMessage, cmdArgs);
}

async function registerEvents(client, dir = '') {
	const filePath = path.join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(path.join(filePath, file));
		if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
		if (file.endsWith('.js')) {
			const event = require(path.join(filePath, file));
			client.events.set(event.name, event);
			client.on(event.name, event.run.bind(event, client));
		}
	}
}

module.exports = {
	registerCommands,
	registerEvents,
};
