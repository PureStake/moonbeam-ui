import React, { useState } from 'react';
import { Form, Input, Grid } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api } = useSubstrate();
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({ amount: 0 });
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
            fluid label='picoGLMR to deposit' type='number'
            state='glmrAmount' onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid label='picoTOKEN to deposit' type='number'
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
              params: [glmrAmount, tokenAmount],
              tx: api.tx.moonbeam.depositLiquidity
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function TradeGlmrToToken (props) {
  const { api } = useSubstrate();
  return (api.tx.moonbeam && api.tx.moonbeam.tradeGlmrToToken
    ? <Main {...props} /> : null);
}
