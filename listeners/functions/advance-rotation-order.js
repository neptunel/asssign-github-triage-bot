
const advanceRotationOrder = async ({ event, success, error, client}) => { 
    var fs = require('fs');
    var workflow;

    fs.readFile('listeners/functions/rotation.csv', 'utf8', function (err, data) {
        try {
            workflow = data.split(",\n");
            console.log(workflow);
        }
        catch (err) {
            console.log("File read error.");
        }
    });

    try{
        const result = await client.chat.postMessage({
            channel: event.inputs.channel_id,
            text: "Triage rotation has been updated automatically"
         
        });
        }  
    
    catch (err) { await error('API error', err); }

    try {
    
    var nextWorkflow = workflow;
    var lastTeammate = nextWorkflow.shift();

    for (let i =0 ; i<workflow.length; i++) { 
        workflow[i] = nextWorkflow[i].concat(",") 
    }
    workflow = workflow.concat(lastTeammate);

    var data = workflow.join('\n');

    fs.writeFile('listeners/functions/rotation.csv',data , (err) => {
        if (err)
            console.log("File write error");
        else 
            console.log("File written successfully\n");
        });

   

    await success({advanceRotationOrder: "App worked successfully"});
    }
    catch (err) { await error("There was an issue", err); }

};

module.exports = { advanceRotationOrder };