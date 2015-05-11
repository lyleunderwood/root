In-Game Commands
---

- netscan: this will enter the player into a queue to be paired with another 
player. In-fiction, the player is scanning for other computers that they can try
to hack. This is the means for engaging with another player

- rend: the action that actually breaks into a port. if it is the root port, you
win. if it is not the root port, the opposing player can see what port you were 
using, what program is on there, and maybe other information. rend takes a good 
chunk of time to complete. rend also uninstalls any program that was on that
port.

- portscan: this will scan all of your own ports, and show you if there has 
recently been any traffic on that port. if you find that the other player is 
currently engaging with a port, you can respond with a trace or a portlock. this 
command is somewhat slow.

- reroot: this will move your root directory to another port. somewhat slow

- trace: if you run this command on a port, it will give you information about 
anything currently interacting with that port. Specifically, it will show you 
the port the other player is using to interact with it. this functionally 
eliminates that port as the root port. it may also show you what is installed on 
the port. the other player will not know that they have been traced

- portlock: this will terminate any current interactions on a port. if the other 
player is engaging with one of your ports, you can stop them. however, when you 
do this, it will inform that player that the port they were trying to access was 
locked. this could lead them to suspect that you didnt want them to get into 
that port.

- knock: this can be used on a specific port of the opposing player to gather 
information about it. 

- ghost: this command will create a ghost on a single port. this means that it 
will return false information if it is probed or traced. you specify the 
information you want it to return. 

- probe: a heavier and slower knock. if the port has a ghost, it will dispell 
the ghost but will not then give you full information. you have to follow up 
with a probe (or knock)

- mount: this can install different attack/defense programs onto a port. it 
takes variable amounts of time for the program to be mounted


Gameplay
---

The most basic game loop is to probe each individual port until you find the 
root port, then rend it. 

The first layer of complexity, is the ability to port scan and port lock. This 
gives you your first defensive measure, seeing what the other player is doing 
and stopping them. 

The next layer of complexity is the ability to trace. Tracing is used under the 
same context as port lock, but instead of rebuffing the player you are using it 
as a chance to gather information about them.

On top of this, is the ability to reroot, moving your root directory to another 
port. This is a defensive counter measure to foil an opponent who has discovered 
where your root directy is located.

Next, is the ability to knock. Knocking is similar to probe, but significantly 
faster. However, the information it gives back is less specific. 

Counter to knocking, is the ability to "ghost" a port. A port with a ghost on it 
will return false information to a knock. However, a probe will detect and 
dispel a ghost. A ghost will also be dispelled if you perform any action on the 
port with the ghost on it.

Programs
---

Programs can be installed/uninstalled on any port. After installing them, they 
have a passive effect on the port they are installed on. 

- root: this is the actual "operating system" program. it comes pre-installed on 
a random port. Getting this rended will lose you the game

- imp: this is the fastest to install program. it does nothing but occupy the 
program space. this is useful because a knock will report that there is a 
program installed on that port. Non-trivial uninstall time, to prevent immediate 
installation of this on every single port.

- venus: this program will fully occupy the port, you can not use it while the 
program is installed. If venus is rended, it will dump a bunch of information 
about the port the opponent used to access it. medium install time

- titan: this will make all operation on this port take much longer (2x-5x). 
However, with titan installed, commands ran from this port can not be 
portblocked. Very large install time.

- cuckoo: this program speeds up the time of all your programs. However, it...