# @signald-node/client

## Installation

```
`npm install @signald-node/client @signald-node/protocol`
```

## Usage

```
import { Signald } from "@signald-node/client";
import { list_accounts } from "@signald-node/protocol";

const client = new Signald("/signald/signald.sock" as any, () => onReady());

async function onReady() {
  const accounts = await list_accounts(client, {});

  console.log(accounts);
}
```
