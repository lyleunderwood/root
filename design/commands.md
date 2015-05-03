In-Game Commands
---

- netscan: this will enter the player into a queue to be paired with another player. In-fiction, the player is scanning for other computers that they can try to hack. This is the means for engaging with another player

- rend: the action that actually breaks into a port. if it is the root port, you win. if it is not the root port, the opposing player can see what port you were using, what program is on there, and maybe other information. 

- portscan: this will scan all of your own ports, and show you if there has recently been any traffic on that port. if you find that the other player is currently engaging with a port, you can respond with a trace or a portlock. this command is somewhat slow.

- trace: if you run this command on a port, it will give you information about anything currently interacting with that port. Specifically, it will show you the port the other player is using to interact with it. this functionally eliminates that port as the root port. it may also show you what is installed on the port

- portlock: this will terminate any current interactions on a port. if the other player is engaging with one of your ports, you can stop them. 

- mount: this can install different attack/defense programs onto a port. it takes variable amounts of time for the program to be mounted

- probe: this can be used on a specific port of the opposing player to gather information about it. 

- ghost: this command will create a ghost on a single port. this means that it will return false information if it is probed or traced. you specify the information you want it to return. 

- knock: a heavier and slower probe. if the port has a ghost, it will dispell the ghost but will not then give you full information. you have to follow up with a probe (or knock)
