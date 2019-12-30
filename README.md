# Moonbeam UI Prototype

This is a prototype UI for Moonbeam Dex.  It works in conjunction with and connects to Moonbeam (https://github.com/PureStake/moonbeam).

The prototype is built using the substrate-ui-template which in turn is created with [Create React App](https://github.com/facebook/create-react-app)
and [Polkadot js API](https://polkadot.js.org/api/). 

## Installation

The code can be installed using [git](https://git-scm.com/) and [yarn](https://yarnpkg.com/).

```bash
# Clone the repository
git clone https://github.com/PureStake/moonbeam-ui.git
cd ./moonbeam-ui
```

```bash
yarn install
```
Note: you will need appropriate github permissions in this repo for these commands to work.

## Usage

You can start the template in development mode to connect to a locally running node

```bash
yarn start
```

You can also build the app in production mode,

```bash
yarn build
```
and open `build/index.html` in your favorite browser.

## Configuration

The app's configuration is stored in the `src/config` directory, with
`common.json` being loaded first, then the environment-specific json file,
and finally environment variables, with precedence.

* `development.json` affects the development environment
* `test.json` affects the test environment, triggered in `yarn test` command.
* `production.json` affects the production environment, triggered in
`yarn build` command.

Some environment variables are read and integrated in the template `config` object,
including:

* `REACT_APP_PROVIDER_SOCKET` overriding `config[PROVIDER_SOCKET]`
* `REACT_APP_DEVELOPMENT_KEYRING` overriding `config[DEVELOPMENT_KEYRING]`

More on [React environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables).

When writing and deploying your own front end, you should configure:

* `CUSTOM_TYPES` in `src/config/common.json`. See
  [Extending types](https://polkadot.js.org/api/start/types.extend.html).
* `PROVIDER_SOCKET` in `src/config/production.json` pointing to your own
  deployed node.
* `DEVELOPMENT_KEYRING` in `src/config/common.json` be set to `false`.
  See [Keyring](https://polkadot.js.org/api/start/keyring.html).

## Moonbeam Prototype Dex UI Quickstart

To use the UI, you need to do the following:
* Build and start a Moonbeam node (https://github.com/PureStake/moonbeam)
* Build and start a Moonbeam UI with yarn start
* Point your browser at http://localhost:8000
* In order to start using the Dex, you need to set Glimer and Token balances for a user (e.g. Alice).  
* To do this, use the Sudo module from the polkadot-js apps ui, and call the setGlmrBalance and setTokenBalance functions.
* Once you have GLMR and TOKEN balances, you can deposit liquidity into the exchange.
* After depositing liquidity, you can try trading GLMR to TOKEN and TOKEN to GLMR.
* You can withdraw liquidity from the exchange at any time.


