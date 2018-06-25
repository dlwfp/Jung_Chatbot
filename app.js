var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var dialogflow = require('dialogflow');

var projectId  =  'chatbot-server-207800'; // https://dialogflow.com/docs/agents#settings 
var sessionId  =  '74413870a27a474b8d45af029def93da';
var languageCode  =  'ko-KR';

var flow_client = new dialogflow.SessionsClient();
var flow_path = flow_client.sessionPath(projectId,sessionId);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/keyboard', function(req, res){
  const menu = {
      "type": 'text'
  };
  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});

app.post('/message',function (req, res) {
	const user_message = req.body.content;
	const request = { 
		session: flow_path,
		queryInput: {
			text: {
				text: user_message,
		      languageCode: languageCode,
    		},  
  		},  
	};
	flow_client	
		.detectIntent(request)
		.then(responses => {
			console.log('Detected intent');
			const result = responses[0].queryResult;
			console.log(`  Query: ${result.queryText}`);
			console.log(`  Response: ${result.fulfillmentText}`);
			let message = {
				"message": {
					"text": result.fulfillmentText
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message))
			
			if (result.intent) {
				console.log(`  Intent: ${result.intent.displayName}`);
			} else {
				console.log(`  No intent matched.`);
			}   
		})
		.catch(err => {
			console.error('ERROR:', err);
		}); 
});

app.listen(9000, function() {
});
