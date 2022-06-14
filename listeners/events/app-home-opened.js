const appHomeOpenedCallback = async ({ client, event }) => {
  // Ignore the `app_home_opened` event for anything but the Home tab
  if (event.tab !== 'home') return;
  
  const fs = require('fs');
  var workflow;
    fs.readFile('listeners/functions/rotation.csv', 'utf8', function (err, data) {
        try { workflow = data;}
        catch (err) { console.log("File read error.");}
    });
   
  try {
      
    const userInfo = await client.users.info({
      user: event.user
    });

    var currentUsers= workflow.split(","); 
    console.log("currentUSers: ",currentUsers)
    currentUsers.forEach((element,index) => { currentUsers[index]=element.replace('\n','')});
    console.log("currentUSers edited: ",currentUsers)

    



    wfArray = workflow.split(',');
    console.log(wfArray);
    wfArray.forEach((element,index) => { wfArray[index]='<@'.concat(element.replace('\n','')).concat('>\n')});
    console.log(wfArray);
    workflow = wfArray.join('');

    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: [
          {
         
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `*Welcome home, <@${event.user}> :house:*`
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Assign and keep track of the responsible teammates on github triage process!"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Some refreshers to get you started:\n\n\n",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "1. :github: <https://github.com/issues?q=is:issue+archived:false+label:auto-triage-stale+is:open|Stale GitHub Issues>"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "- Start each week by reviewing the stale GitHub Issues",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "- Follow-up on any that need action from our team",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "- <https://corp.quip.com/xhfeAyWwRaTQ/DevRel-Tools-Development-Process#temp:C:fAX1476d484bf5e4590bc1339bcd|Learn more about Stale GitHub Issues>"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "\n2. :heart: Triage activity from these areas:"
			}
		},
   
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "a. :slack: <#triage-sdk>  \nb. :slack: <#team-devrel-tools-github-notifications>\nc. :slack: <#feedback-bolt>\nd. :slack: <#plz-devrel>"
				
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "e. <https://forums.slackcommunity.com/s/topic/0TO3a000000gNnSGAU/sdks-and-developer-tools?language=en_US|Slack Community - SDK & Developer Tools>"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "f. <https://community.slack.com/archives/CHY642221|Slack Community Workspace #tools-bolt>"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": " \n3. :quip: <https://corp.quip.com/xhfeAyWwRaTQ/DevRel-Tools-Development-Process|DevRel Tools Development Process> "
			}
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "- When in doubt, review our development process doc",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "- Don’t forget, we’re all in this together, so don’t hesitate to reach out to the DevRel Tools team :people_hugging:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "\n\n\nActive Rotation Order:\n\n",
				"emoji": true
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": `${workflow}`
			}
      
		},
    {
			"type": "divider"
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "\n\n\nCreate New Rotation Order:\n\n",
				"emoji": true
			}
		},
    {
      "type": "input",
      "element": {
        "type": "multi_users_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select users",
          "emoji": true
        },
        "action_id": "multi_users_select-action",
        "initial_users": currentUsers
      },
      "label": {
        "type": "plain_text",
        "text": "Users",
        "emoji": true
      }
    }
    
	]
},
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { appHomeOpenedCallback };
