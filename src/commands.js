var CommandList = require('./command_list');

CommandList.addCommands(
  require('./commands/netscan'),
  require('./commands/portscan'),
  require('./commands/rend')
);
