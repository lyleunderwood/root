basic protocol
---

1. client connects
2. SERVER: globalState
  - obj: commands
  - bool: serverReady
  - string: sessionId
3. CLIENT: command
  - string: sessionId
  - string: name
  - array: arguments
5. SERVER: commandResponse
  - string: commandId
4. SERVER: commandStatus
  - string: commandId
  - string: status [success, running, failure]
  - obj: response
5. CLIENT: interruptCommand
  - string: sessionId
  - string: commandId
6. SERVER: interruptCommandResponse
  - string: commandId
  - string: status [success, failure]
  - obj: response
7. SERVER: clientDeath
  - obj: stats
8. SERVER: clientWin
  - obj: stats
