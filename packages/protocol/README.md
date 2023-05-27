# @signald-node/protocol

Types and actions to communicate with a [signald](https://signald.org) instance.

This library is generated from the [signald protocol document](https://signald.org/protocol.json)

## Installation

`npm install @signald/protocol`

## Usage

You'll most probably want to use `@signald-node/client` or `@signald-node/bot` to communicate with signald.

This package currently exports the v1 types of the signald protocol.

```
import { list_accounts } from "@signald-node/protocol"

const client = // client from @signald-node/client or @signald-node/bot

const accounts = await list_accounts(client, {})
```