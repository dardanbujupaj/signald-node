## Setup example bot

1. Setup Signald instance and tcp relay:

```
cd apps/example-bot
docker compose up -d
```

2. Register an account accoring to https://signald.org/articles/getting-started/#registering.
   (Note that if you use linking instead of registering, you might need to update the message handlers to use `sync_message` instead of `data_message`)

3. Run example bot, providing you registered phone number:

```
export SIGNAL_PHONE_NUMBER="<registered phone number>"; pnpm run dev
```
