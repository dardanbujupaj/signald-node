# @signald/client

## Installation

```
`npm install @signald/client @signald/protocol`
```

## Usage

```
import { Signald } from "@signald/client";
import { list_accounts } from "@signald/protocol";

const client = new Signald("/signald/signald.sock" as any, () => onReady());

async function onReady() {
  const accounts = await list_accounts(client, {});

  console.log(accounts);
}
```
