const removePerson = async ({ event, success, error, client}) => {    

const removeperson = event.inputs.removePerson;
    
  const fs = require('fs');
  var wfArray;
 
    var data = fs.readFileSync('listeners/functions/rotation.csv',{encoding:'utf8', flag:'r'});
    try { wfArray = data.split(",\n");;}
    catch (err) { console.log("File read error.");}
    
  
    try{

  if(removeperson != null){
    const isArgument = (element) => element == removeperson;
    const index = wfArray.findIndex(isArgument);   
    if (index > -1) {
     wfArray.splice(index, 1); // 2nd parameter means remove one item only
    }

    wf=wfArray.join(',\n');
    fs.writeFile('listeners/functions/rotation.csv', wf, (err) => {
      if (err)
          console.log("File write error");
      else 
          console.log("File written successfully\n");
      });
  
  }
  else {await error("The selected user is already not in the triage rotation.", err);}

  try{
        const userInfo = await client.users.info({
            user: event.inputs.user_id
        });
        const userName = userInfo.user.real_name;  
        var newMessage = "Triage rotation has been updated by ".concat(userName);

        const result = await client.chat.postMessage({
        channel: event.inputs.channel_id,
        text: newMessage
        });
    }
    catch (err) {
        // call error callback with function outputs
        await error('API error', err);
    }

    await success({ removePerson: "App worked successfully"});
}
catch (err) {
    await error("There was an issue", err);
}

};

module.exports = { removePerson };
