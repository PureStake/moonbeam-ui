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

  const { amount } = formState;

  return (
    <Grid.Column>
      <h1>Buy GLMR</h1>
      <Form>
        <Form.Field>
          <Input
            fluid label='picoTOKEN to spend' type='number'
            state='amount' onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <TxButton
            accountPair={accountPair}
            label='Buy'
            setStatus={setStatus}
            type='TRANSACTION'
            attrs={{
              params: [amount],
              tx: api.tx.moonbeam.tradeTokenToGlmr
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function TradeTokenToGlmr (props) {
  const { api } = useSubstrate();
  return (api.tx.moonbeam && api.tx.moonbeam.tradeTokenToGlmr
    ? <Main {...props} /> : null);
}
