import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

import formatBalance from './MoonbeamUtil';

export default function Prices () {
  const { api } = useSubstrate();

  const [glmrPrice, setGlmrPrice] = useState('0');
  const [tokenPrice, setTokenPrice] = useState('0');

  useEffect(() => {
    let unsubscribe;

    api.query.moonbeam.glmrPrice((currentGlmrPrice) => {
      setGlmrPrice(currentGlmrPrice.toString());
    })
      .then(unsub => { unsubscribe = unsub; })
      .catch(console.error);

    api.query.moonbeam.tokenPrice((currentTokenPrice) => {
      setTokenPrice(currentTokenPrice.toString());
    })
      .then(unsub => { unsubscribe = unsub; })
      .catch(console.err);

    return () => unsubscribe && unsubscribe();
  }, [api.query.moonbeam]);

  console.log(glmrPrice);
  console.log(tokenPrice);

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>GLMR Price</Card.Header>
          <Card.Description>{formatBalance(tokenPrice)} TOKEN</Card.Description>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>TOKEN Price</Card.Header>
          <Card.Description>{formatBalance(glmrPrice)} GLMR</Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
