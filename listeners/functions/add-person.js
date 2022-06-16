const addPerson = async ({ event, success, error, client }) => {
  const newPerson = event.inputs.add_new_person;

  const fs = require('fs');
  var array;
  fs.readFile('listeners/functions/rotation.csv', 'utf8', function (err, data) {
    try { array = data; }
    catch (err) { console.log("File read error."); }
  });

  if (newPerson != null) {
    fs.appendFile('listeners/functions/rotation.csv', ",\n" + newPerson, (err) => {
      if (err)
        console.log("File append error");
      else
        console.log("File appended successfully\n");
    });

  }

  try {

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

  try {
    await success({ addPerson: "App worked successfully" });

  } catch (err) {
    // call error callback with function outputs
    await error("There was an issue", err);
  }
};

module.exports = { addPerson };