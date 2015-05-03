In-Game Commands
---

Central Commands: 

- netscan: this will enter the player into a queue to be paired with another player. In-fiction, the player is scanning for other computers that they can try to hack. This is the means for engaging with another player

- rend: the action that actually breaks into a port. if it is the root port, you win. if it is not the root port, the opposing player can see what port you were using, what program is on there, and maybe other information. rend takes a good chunk of time to complete.

- portscan: this will scan all of your own ports, and show you if there has recently been any traffic on that port. if you find that the other player is currently engaging with a port, you can respond with a trace or a portlock. this command is somewhat slow.

- reroot: this will move your root directory to another port. somewhat slow

- trace: if you run this command on a port, it will give you information about anything currently interacting with that port. Specifically, it will show you the port the other player is using to interact with it. this functionally eliminates that port as the root port. it may also show you what is installed on the port. the other player will not know that they have been traced

- portlock: this will terminate any current interactions on a port. if the other player is engaging with one of your ports, you can stop them. however, when you do this, it will inform that player that the port they were trying to access was locked. this could lead them to suspect that you didnt want them to get into that port.

- knock: this can be used on a specific port of the opposing player to gather information about it. 

- ghost: this command will create a ghost on a single port. this means that it will return false information if it is probed or traced. you specify the information you want it to return. 

- probe: a heavier and slower knock. if the port has a ghost, it will dispell the ghost but will not then give you full information. you have to follow up with a probe (or knock)

- mount: this can install different attack/defense programs onto a port. it takes variable amounts of time for the program to be mounted

---

The most basic game loop is to probe each individual port until you find the root port, then rend it. 

The first layer of complexity, is the ability to port scan and port lock. This gives you your first defensive measure, seeing what the other player is doing and stopping them. 

The next layer of complexity is the ability to trace. Tracing is used under the same context as port lock, but instead of rebuffing the player you are using it as a chance to gather information about them.

On top of this, is the ability to reroot, moving your root directory to another port. This is a defensive counter measure to foil an opponent who has discovered where your root directy is located.

