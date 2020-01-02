/* global BigInt */
import React, { useState } from 'react';
import { Form, Input, Grid } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ glmrAmount: 0, tokenAmount: 0 });
  const { accountPair } = props;

  const onChange = (_, data) =>
    setFormState(prevState => ({ ...formState, [data.state]: data.value }));

  const { glmrAmount, tokenAmount } = formState;

  return (
    <Grid.Column>
      <h1>Desposit Liquidity</h1>
      <Form>
        <Form.Field>
          <Input
            fluid label='GLMR to deposit' type='number'
            state='glmrAmount' onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid label='TOKEN to deposit' type='number'
            state='tokenAmount' onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <TxButton
            accountPair={accountPair}
            label='Deposit'
            setStatus={setStatus}
            type='TRANSACTION'
            attrs={{
              params: [BigInt(glmrAmount * 1000000000000), BigInt(tokenAmount * 1000000000000)],
              tx: api.tx.moonbeam.depositLiquidity
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function DespositLiquidity (props) {
  const { api } = useSubstrate();
  return (api.tx.moonbeam && api.tx.moonbeam.depositLiquidity
    ? <Main {...props} /> : null);
}
