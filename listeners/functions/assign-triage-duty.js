const assignTriageDuty= async ({ event, success, error, client }) => {

    var current;
    var fs = require('fs');
  
    /*fs.readFileSync('listeners/functions/rotation.csv', 'utf8',  function (err, data) {
        if (err)
            console.log("File read error.");
        else
            current = data.split(",")[0];

    });*/
    const data = fs.readFileSync('listeners/functions/rotation.csv',{encoding:'utf8', flag:'r'});
    current = data.split(",")[0];
   
    try {
        function getMondayOfCurrentWeek() {
            const today = new Date();
            const first = today.getDate() - today.getDay() + 1;
          
            const monday = new Date(today.setDate(first)).toLocaleDateString();
            return monday;
        }
            
            
       /* const userInfo = await client.users.info({
                user: event.inputs.user_id
              });
        const userName = userInfo.user.real_name;*/
        
        const newTopic =  `<@${current}>`.concat(" is now on triage duty for the week of ").concat(getMondayOfCurrentWeek());

        const result = await client.conversations.setTopic({

            channel: event.inputs.channel_id,
            topic: newTopic
        });
       
        
        const message = 
        `*Howdy, <@${current}> :wave:*

        It’s your turn to help triage our community feedback and issues! Thanks so much! :bow:

        *Some refreshers to get you started:*

        1. *:github: <https://github.com/issues?q=is%3Aissue+archived%3Afalse+label%3Aauto-triage-stale+is%3Aopen|Stale GitHub Issues>*
                - Start each week by reviewing the stale GitHub Issues
                - Follow-up on any that need action from our team
                - <https://corp.quip.com/xhfeAyWwRaTQ/DevRel-Tools-Development-Process#temp:C:fAX1476d484bf5e4590bc1339bcd|Learn more about Stale GitHub Issues>
        2. *:heart: Triage* activity from these areas:
                a. :slack: <#triage-sdk>
                b. :slack: <#team-devrel-tools-github-notifications>
                c. :slack: <#feedback-bolt>
                d. :slack: <#plz-devrel>
                e. <https://forums.slackcommunity.com/s/topic/0TO3a000000gNnSGAU/sdks-and-developer-tools?language=en_US|Slack Community - SDK & Developer Tools>
                f. <https://community.slack.com/archives/CHY642221|Slack Community Workspace #tools-bolt>
        3. *:quip: <https://corp.quip.com/xhfeAyWwRaTQ/DevRel-Tools-Development-Process|DevRel Tools Development Process>* 
                - When in doubt, review our development process doc
                - Don’t forget, we’re all in this together, so don’t hesitate to reach out to the DevRel Tools team :people_hugging:` ;

      


        const postToChannel = await client.chat.postMessage({
            channel: event.inputs.channel_id,
            text: message

        });


        await success({ assignTriageDuty: "App worked successfully" });

    }
    catch (err) {
        // call error callback with function outputs
        await error("There was an issue", err);
    }
};

module.exports = { assignTriageDuty };