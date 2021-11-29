<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
  </p>
  <br />
</div>

## About
This is a useful little template to easily perform interactions with the [Discord API](https://discord.com/developers/docs/intro)
using [Discord.js](https://discord.js.org/) with [Node.js](https://nodejs.org).

- Object-oriented
- Ready to use template
- Database connection using [Sequelize](https://sequelize.org/master/)
- Examples included

I would love seeing you on my [Discord](https://discord.gg/NHJ5hmnhbt).

## Installation

**[Docker](https://docs.docker.com/get-docker/) 1.13.0 or newer is required.**<br>
**[Docker-Compose](https://docs.docker.com/compose/install/) 1.10.0 or newer is required.**

First you need to create your configuration file.
```sh-session
cp .env.example .env
vim .env
```
Just make your adjustments to the configuration and drop the [bot token](https://discord.com/developers/).

### For Development

Just change the NODE_ENV variable in the .env file to "development" and start your Compose.
```sh-session
docker-compose up -d --build
```

### For Production

After changing the NODE_ENV variable to "production", you still need to link the .env file to the Docker compose.
To do this, add the "env_file" section under the app service.
```yml
env_file:
  - .env
```
After that you can start your bot just like for development.
```sh-session
docker-compose up -d --build
```

## Example usage

### Commands

Just create an new file in the commands diretory or an sub-folder (`./src/commands`).
```js
module.exports = {
	command: 'test',
	onlyAdmin: false,

	async run(client, message, args) {
		message.channel.send('Hello World!');
	},
};
```
- **command** defines the syntax how you can use your command (BOT_PREFIX + command)
- **onlyAdmin** says if only users who have the role with id BOT_ADMIN_ROLE_ID can use them.

### Events

For using an event create a file at the events directory or an sub-folder (`./src/events`).
```js
module.exports = {
	name: 'ready',

	async run(client) {
		console.log('Hello World');
	},
};
```
- **name** defines the type of event you are listening for. ([help](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584))

*Note that the passing parameters may differ from event to event. Only the client is always passed as the first object.* ([help](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584))

### Database

#### Creating a database table
For this create a file at `./src/database/definitions`
```js
const DataTypes = require('sequelize');

module.exports = {
	name: 'Test',
	table: {
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		test: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	associations: [
		{
			type: 'belongsTo',
			table: 'Tim',
			options: {
				as: 'parent',
				foreignKey: 'test',
				onDelete: 'CASCADE',
			},
		},
	],
};
```
- **Name** contains the name of the table. The file name will be ignored.<br>
- **[Table](https://sequelize.org/master/manual/model-basics.html)** contains the available columns.<br>
- **[Associations](https://sequelize.org/master/class/lib/associations/base.js~Association.html)** consists of 3 parts.<br>
  - **Type**: The type of the association. (belongsTo, hasMany, hasOne)
  - **Table**: The name of the table you are refering to.
  - **Options**: Supports the same values as in Sequelize itself.
### Working with entries
For accessing the entries you can use the same syntax as in Sequelize. ([help](https://sequelize.org/master/manual/model-querying-basics.html))<br>
To use your tables you just have to import them on top of your file.
```js
const { Test } = require('../database').models;
```

## Links

- [Discord.js Documentation](https://discord.js.org/#/docs/)
- [Discord.js Guide](https://discordjs.guide/)
- [Sequelize Documentation](https://sequelize.org/master/)

- [Discord](https://discord.gg/NHJ5hmnhbt)
- [GitHub](https://github.com/CaveGames)
