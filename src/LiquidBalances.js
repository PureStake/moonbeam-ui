import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

import formatBalance from './MoonbeamUtil';

export default function LiquidBalances (props) {
  const { api } = useSubstrate();

  const { accountAddress } = props;
  const [liquidBalance, setLiquidBalance] = useState('0');

  useEffect(() => {
    let unsubscribe;

    if (accountAddress != null) {
      api.query.moonbeam.liquidBalances(accountAddress, (currentBalance) => {
        setLiquidBalance(currentBalance.toString());
      })
        .then(unsub => { unsubscribe = unsub; })
        .catch(console.err);
    }

    return () => unsubscribe && unsubscribe();
  }, [accountAddress, api.query.moonbeam]);

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>MY LIQUID BALANCE</Card.Header>
          <Card.Meta>
            <span></span>
          </Card.Meta>
          <Card.Description>
            {formatBalance(liquidBalance)}
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
