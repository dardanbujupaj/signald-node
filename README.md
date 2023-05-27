# Signald Node

A set of libraries to interface with [signald](https://signald.org) and create signal bots with it in TypeScript.
The signald types and actions are generated from the signald protocol document.

## Usage

Depending on your use case, refer to the [@signald-node/client](packages/client) or [@signald-node/bot](packages/bot) documentation.

## Packages

- `@signald-node/protocol`: types and actions for communication with signald, generated from the [signald protocol document](https://signald.org/articles/protocol/documentation/)
- `@signald-node/client`: a basic node client to connect to and exchange data with a signald instance
- `@signald-node/bot`: a bot to process signal messages using using message handlers

## Example Bot

See the [example bot readme](apps/example-bot/) for an example usage of the @signald-node/bot library.

## Links

- [signald](https://signald.org) - an unofficial API for Signal
