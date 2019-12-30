import React, { useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Sticky } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

import AccountSelector from './AccountSelector';
// import Balances from './Balances';
import BlockNumber from './BlockNumber';
// import ChainState from './ChainState';
import DepositLiquidity from './DepositLiquidity';
import Events from './Events';
// import Extrinsics from './Extrinsics';
import GlmrBalances from './GlmrBalances';
import LiquidBalances from './LiquidBalances';
// import Metadata from './Metadata';
import NodeInfo from './NodeInfo';
import Prices from './Prices';
import Reserves from './Reserves';
// import TemplateModule from './TemplateModule';
import TokenBalances from './TokenBalances';
import TradeGlmrToToken from './TradeGlmrToToken';
import TradeTokenToGlmr from './TradeTokenToGlmr';
// import Transfer from './Transfer';
// import Upgrade from './Upgrade';
import WithdrawLiquidity from './WithdrawLiquidity';

function Main () {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState } = useSubstrate();
  // const { apiState, keyringState } = useSubstrate();
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const loader = text => (
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>
  );

  if (apiState === 'ERROR') return loader('Error connecting to the blockchain');
  else if (apiState !== 'READY') return loader('Connecting to the blockchain');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector setAccountAddress={setAccountAddress} />
      </Sticky>
      <Container>
        <Grid stackable columns='equal'>
          <Grid.Row stretched>
            <NodeInfo />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <LiquidBalances accountAddress={accountAddress} />
            <GlmrBalances accountAddress={accountAddress} />
            <TokenBalances accountAddress={accountAddress} />
          </Grid.Row>
          <Grid.Row>
            <Prices />
            <TradeTokenToGlmr accountPair={accountPair} />
            <TradeGlmrToToken accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row>
            <Reserves />
            <DepositLiquidity accountPair={accountPair} />
            <WithdrawLiquidity accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row stretched>
            <Events />
          </Grid.Row>
        </Grid>
        <DeveloperConsole />
      </Container>
    </div>
  );
}

export default function App () {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
