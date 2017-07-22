// Description:
//   A Marking U Bot.
//
// Dependencies:
//   bitmarkd must be running
//   bitmark-cli must be in path
//   wallet must be funded
//
// Configuration:
//
//
// Commands:
//   + <times> <user> <reason>        -   Marks the specified user.
//   withdraw <address> <amount>      -   withdraw to address amount.
//   marks [user]                     -   Balance for a user or self.
//
// Author:
//   Project Bitmark
//
(function() {
  var adapter, deposit_marks, exec, marks, symbol, why_context
  exec = require('child_process').exec;
  symbol = '₥';
  function to_URI(name) { return id }               // Pending future API
  function from_URI(URI) { return URI }             // Pending future API
  function deposit_marks(r, URI, amount, robot) { } // Will add when needed
  function transfer_marks(r, recipient, amount, robot, why_context) {
    if (why_context == null) why_context = "N/A"
    if(!keys[r.message.user.id] || !keys[r.message.user.id].bitmark) return r.send("Sorry but you dont have an account, try crypto me bitmark.")
    if (keys[r.message.user.id].bitmark.balance >= parseFloat(amount)) {
      if (!keys[recipient]) {
        robot.emit("createMe", recipient, robot);
        robot.emit("cryptoMeEvent", recipient, 'bitmark', parseFloat(amount), robot)
      } else if(!keys[recipient].bitmark) {
        robot.emit("cryptoMeEvent", recipient, 'bitmark', parseFloat(amount), robot)
      } else {
        keys[recipient].bitmark.balance += parseFloat(amount);
        keys[r.message.user.id].bitmark.balance -= parseFloat(amount);
      }
      robot.brain.save()
      return r.send(r.message.user.name + ' has marked ' + robot.brain.userForId(recipient).name + ' ' + amount + symbol + '. ( ' + why_context + ' )');
    } else {
      return r.send('Sorry, but you dont have enough marks. Try depositng.');
    }
  }
  function withdraw_marks(r, address, amount, robot) {
    if (keys[r.message.user.id].bitmark.balance >= parseFloat(amount)) {
      var command = 'bitmarkd sendtoaddress ' + address + ' ' + (parseFloat(amount) / 1000.0);
      return exec(command, (error, stdout, stderr) => {
        keys[r.message.user.id].bitmark.balance -= parseFloat(amount);
        return r.send(stdout);
      });
    } else {
      return r.send('Sorry, you have not been marked that many times yet.');
    }
  }
  module.exports = robot => {
    adapter = robot.adapterName;
    robot.brain.on('loaded', ()=>{
      keys = bot.brain.data.keys || (bot.brain.data.keys = {});
      //if (robot.brain.data.marks == null) robot.brain.data.marks = {}; marks = robot.brain.data.marks;
      //if(marks['183771581829480448'] == null) marks['183771581829480448'] = 12000
      //if(marks['U02JGQLSQ']          == null) marks['U02JGQLSQ']          = 12000
    })
    robot.hear(/withdraw\s+([\w\S]+)\s+(\d+)\s*$/i, r => withdraw_marks(r, r.match[1], r.match[2], robot))
    robot.hear(/marks\s*$/i, r => {
      try { var balance = keys[r.message.user.id].bitmark.balance } catch(e) { var balance = 0 }
      r.send('You have ' + balance + symbol + '.');
    });
    //robot.router.get("/api/marks", (req, res) => {});
    if(adapter == 'discord') {
      robot.hear(/marks\s+@? (.*)#(\d{4})/i, r => {
        arr = robot.brain.usersForFuzzyName(r.match[1])
        if (arr.length == 1 && marks[arr[0].id]) {
          return r.send(r.match[1] + ' has ' + keys[arr[0].id].bitmark.balance + symbol + '.')
        } else if (arr.length > 1)  {
          for (i=0; i<arr.length; i++)
            if (arr[i].discriminator == r.match[2])
              return r.send(r.match[1] + ' has ' + keys[arr[i].id].bitmark.balance + symbol + '.')
        } else if (arr.length < 1) return r.send('User ' + r.match[1] + ' was not found.')
        return r.send(r.match[1] + ' has 0' + symbol + '.')
      })
      robot.hear(/marks\s+<@?!?(\d+)>$/i, r => {
       if (robot.brain.data.users[r.match[1]]) {
          try { var balance = keys[r.match[1]].bitmark.balance } catch(e) { var balance = 0 }
          return r.send(robot.brain.data.users[r.match[1]] + ' has ' + keys[r.match[1]].bitmark.balance + symbol + '.');
        } else {
          return r.send("Sorry, I can't find that user.");
        }
      })
      robot.hear(/^\+(\d+)\s+<@?!?(\d+)>\s*(.*)?$/i, r => {
        if (r.match[2] === robot.client.user)   return r.send("Sorry but I am currently unmarkable.");
        if (r.match[2] === r.message.user.id) return r.send("Sorry but you cannot mark yourself.");
        if (r.match[1] <= 100) { return transfer_marks(r, r.match[2], r.match[1], robot, r.match[3]) } else { return r.send('Max is +100') }
      })
      robot.hear(/\+(\d+)\s+@ (.*)#(\d{4}) ?(.*)/i, r => {
        var rec; var arr = robot.brain.usersForFuzzyName(r.match[2])
        if (arr.length == 1) { rec = arr[0].id }
        else if (arr.length > 1)  {
          for (i=0; i<arr.length; i++) if (arr[i].discriminator == r.match[3]) rec = arr[i].id }
        else if (arr.length < 1) { return r.send('User ' + r.match[2] + ' was not found.') }
        if ((r.match[2].toLowerCase() == robot.name.toLowerCase()) && r.match[3] == robot.client.user.discriminator) return r.send("Sorry but I am currently unmarkable.");
        if (rec === r.message.user.id) return r.send("Sorry but you cannot mark yourself.");
        if (r.match[1] <= 100) transfer_marks(r, rec, r.match[1], robot, r.match[4]); else r.send('Max is +100')
      })
    } else if(adapter == 'slack') {
      robot.react(r => {
        if(r.message.type==='added' && r.message.reaction==='mh') {
          var senderID=r.message.user.id; receiverID=r.message.item_user.id
          transfer_marks(r, r.message.item_user.id, 1, robot, "reaction")
        }
      })
      robot.hear(/marks\s*@? ?(\w+)$/i, r => {
        var user = robot.brain.userForName(r.match[1]);
        if (user == null) return r.send("Sorry but I cant find that user.");
        try { var balance = keys[user.id].bitmark.balance } catch(e) { var balance = 0 }
        r.send(r.match[1] + ' has ' + balance + symbol + '.');
      })
      robot.hear(/\+(\d+)\s+@? ?(\w+)\s*(.*)?$/i, r => {
        var rec = robot.brain.userForName(r.match[2])
        if (  rec  ==  null  )                return r.send("Sorry but I cant find that user.");
        if (rec.id == robot.adapter.self.id)  return r.send("Sorry but I am currently unmarkable.");
        if (rec.id == r.message.user.id)      return r.send("Sorry but you cannot mark yourself.");
        if (r.match[1] <= 100) transfer_marks(r, rec.id, r.match[1], robot, r.match[3]); else return r.send('Max is +100')
      })
    }
  };
}).call(this);
