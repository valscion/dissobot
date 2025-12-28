[![CircleCI](https://circleci.com/gh/valscion/dissobot.svg?style=svg)](https://circleci.com/gh/valscion/dissobot)

# dissobot

Telegram bot for signups for Dissonanssi choir rehearsals.

```bash
# Deploy to development
npm run sls -- deploy

# Deploy to production
npm run sls -- deploy --stage production
```

```bash
# View logs
npm run sls -- logs --stage production --tail -f telegram
```

## Local development

NOTE: This information was valid in May 2019 and has since been outdated.

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
