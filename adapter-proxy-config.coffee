class MyProxyConfig
  adapter: process.env.HUBOT_ADAPTER

  events: {
    shouldSend: (adapter, envelope, strings...) ->
      # if somethingIsWrong?
      #   false
      console.log "shouldSend"
      envelope.room = process.env.HUBOT_DEFAULT_ROOM unless envelope.room?
      adapter.robot.emit 'send', envelope, strings
      true

    willSend: (adapter, envelope, strings...) ->
      #do stuff before the message is sent

    stringsForSend: (adapter, envelope, originalStrings...) ->
      #Modify messages that hubot responds with
      console.log(envelope, originalStrings)
      sendMessage = "```#{envelope.message.text} by #{envelope.message.user.name}```"
      originalStrings.push sendMessage
      return originalStrings

    shouldReply: (adapter, envelope, strings...) ->
      # if somethingIsWrong?
      #   false
      console.log "shouldReply"
      envelope.room = process.env.HUBOT_DEFAULT_ROOM unless envelope.room?
      adapter.robot.emit 'send', envelope, strings...
      true
  }

module.exports = MyProxyConfig
