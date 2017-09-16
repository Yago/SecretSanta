# 🎅🏻 Secret Santa

A Secret Santa script using Nexmo (SMS) api.

## Requirements

You will need :
- [📗 Nodejs 8+](https://nodejs.org)
- [🐈 Yarn](https://yarnpkg.com/lang/en/docs/cli/)

Then, install the dependencies :

```bash
$ cd path/to/SecretSanta/
$ yarn
```

## Usage

First, set your own contacts configuration

```bash
$ cp config.sample.json config.json
$ edit config.json
```

Then start the send script 

```bash
$ yarn send
```

If something happened, you can use the `sendMessage()` function to resend message based on the backup file.