# @signald/protocol

Types and actions to communicate with a [signald](https://signald.org) instance.

This library is generated from the [signald protocol document](https://signald.org/protocol.json)

## Installation

`npm install @signald/protocol`

## Usage

You'll most probably want to use `@signald/client` or `@signald/bot` to communicate with signald.

This package currently exports the v1 types of the signald protocol.

```
import { list_accounts } from "@signald/protocol"

const client = // client from @signald/client or @signald/bot

const accounts = await list_accounts(client, {})
```