import React, { useEffect, useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';

import formatBalance from './MoonbeamUtil';

export default function Prices () {
  const { api } = useSubstrate();

  const [glmrReserve, setGlmrReserve] = useState('0');
  const [tokenReserve, setTokenReserve] = useState('0');

  useEffect(() => {
    let unsubscribe;

    api.query.moonbeam.glmrPoolBalance((currentGlmrReserve) => {
      setGlmrReserve(currentGlmrReserve.toString());
    })
      .then(unsub => { unsubscribe = unsub; })
      .catch(console.error);

    api.query.moonbeam.tokenPoolBalance((currentTokenReserve) => {
      setTokenReserve(currentTokenReserve.toString());
    })
      .then(unsub => { unsubscribe = unsub; })
      .catch(console.err);

    return () => unsubscribe && unsubscribe();
  }, [api.query.moonbeam]);

  console.log(glmrReserve);
  console.log(tokenReserve);

  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>GLMR Reserve</Card.Header>
          <Card.Description>{formatBalance(glmrReserve)}</Card.Description>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>TOKEN Reserve</Card.Header>
          <Card.Description>{formatBalance(tokenReserve)}</Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
