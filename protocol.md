basic protocol
---

1. client connects
2. SERVER: send global state
  - obj: commands
  - bool: serverReady
  - string: sessionId
3. CLIENT: user command
  - string: sessionId
  - string: name
  - array: arguments
5. SERVER: user command response
  - string: commandId
4. SERVER: command status
  - string: commandId
  - string: status [success, running, failure]
  - obj: response
5. CLIENT: interrupt user command
  - string: sessionId
  - string: commandId
6. SERVER: interrupt user command response
  - string: commandId
  - string: status [success, failure]
  - obj: response
7. SERVER: client death
  - obj: stats
