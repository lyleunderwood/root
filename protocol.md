basic protocol
---

1. client connects
2. SERVER: send global state
  - obj: available commands by name
  - bool: server ready for connections
  - string: session id
3. CLIENT: user command
  - string: name
  - array: arguments
5. SERVER: user command response
  - string: command id
4. SERVER: command status
  - string: command id
  - string: status [success, running, failure]
  - obj: response
5. CLIENT: interrupt user command
  - string: command id
6. SERVER: interrupt user command response
  - string: command id
  - string: status [success, failure]
  - obj: response
7. SERVER: client death
  - obj: stats
