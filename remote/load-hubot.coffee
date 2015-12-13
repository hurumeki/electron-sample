Path = require 'path'
Fs = require 'fs'
Hubot = require 'hubot'

Options = {
  adapter: 'proxy',
  enableHttpd: false,
  name: process.env.HUBOT_NAME,
  alias: process.env.HUBOT_ALIAS,
  scripts: []
}

process.env.PWD = process.cwd() if /^win/.test(process.platform)

hubotBasePath = Path.join __dirname, '../../', 'node_modules', 'hubot'
adapterPath = Path.join hubotBasePath, 'src', 'adapters'
robot = Hubot.loadBot adapterPath,
                      Options.adapter,
                      Options.enableHttpd,
                      Options.name,
                      Options.alias

robot.receiveCommand = (command)->
  user = @brain.userForName(process.env.USER_NAME)
  message = new Hubot.TextMessage user, robot.name + ' ' + command.text, 'messageId'
  if command.room?
    message.room = command.room;
  robot.receive message

loadScripts = ->
  externalScripts = Path.resolve ".", "external-scripts.json"
  if Fs.existsSync(externalScripts)
    Fs.readFile externalScripts, (err, data) ->
      if data.length > 0
        try
          scripts = JSON.parse data
        catch err
          console.error "Error parsing JSON data from external-scripts.json: #{err}"
          process.exit(1)
        robot.loadExternalScripts scripts

robot.adapter.on 'connected', loadScripts

robot.run()

module.exports = robot
