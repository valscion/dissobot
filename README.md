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
sls offline
```
