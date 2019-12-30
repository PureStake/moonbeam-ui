import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

import formatBalance from './MoonbeamUtil';

export default function GlmrBalances (props) {
  const { api } = useSubstrate();

  const { accountAddress } = props;
  const [glmrBalance, setGlmrBalance] = useState('0');

  useEffect(() => {
    let unsubscribe;

    if (accountAddress != null) {
      api.query.moonbeam.glmrBalances(accountAddress, (currentBalance) => {
        setGlmrBalance(currentBalance.toString());
      })
        .then(unsub => { unsubscribe = unsub; })
        .catch(console.error);
    }

    return () => unsubscribe && unsubscribe();
  }, [accountAddress, api.query.moonbeam]);

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>MY GLMR BALANCE</Card.Header>
          <Card.Meta>
            <span></span>
          </Card.Meta>
          <Card.Description>
            {formatBalance(glmrBalance)}
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
