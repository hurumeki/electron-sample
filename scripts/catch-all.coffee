# Description:
#   cathc all commands
#
# Commands:
#
module.exports = (robot) ->
  robot.catchAll (msg) ->
    console.log(msg.message.text)
    msg.send msg.message?.text
