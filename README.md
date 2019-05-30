# dissobot

Telegram bot for signups for Dissonanssi choir rehearsals.

```bash
# Deploy to development
sls deploy

# Deploy to production
sls deploy --stage
```

```bash
# View logs
sls logs --stage production --tail -f telegram
```

## Local development

```
npm install -g serverless
npm install
sls dynamodb install
```

Then you'll need to start the local DynamoDB service:

```
sls dynamodb start
```

Now you're ready to develop with offline serverless:

```
sls offline
```

Note that you will need to shut down the DynamoDB offline server manually after starting it when you're done:

```
pkill -f -I 'java.*dynamodb'
```
