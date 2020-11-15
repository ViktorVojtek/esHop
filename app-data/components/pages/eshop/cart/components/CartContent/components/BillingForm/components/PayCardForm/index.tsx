import React, { useRef, useEffect } from 'react';
import Loading from '../../../../../../../../../../shared/components/Loading';

type PayCardFormType = {
  amount: string;
  clientid: string;
  currency: string;
  encoding: string;
  failUrl: string;
  hash: string;
  hashAlgorithm: string;
  lang: string;
  oid: string;
  okUrl: string;
  rnd: string;
  storetype: string;
  trantype: string;
};

type IPayCardForm = {
  orderData: PayCardFormType;
};

const PayCardForm: (props: IPayCardForm) => JSX.Element = (props) => {
  const { orderData } = props;
  const {
    amount,
    clientid,
    currency,
    encoding,
    failUrl,
    hash,
    hashAlgorithm,
    lang,
    oid,
    okUrl,
    rnd,
    storetype,
    trantype,
  } = orderData;
  const form = useRef(null);

  useEffect(() => {
    form.current && form.current.submit();
  });

  return (
    <>
      <Loading />
      <form
        method="post"
        ref={form}
        action="https://testsecurepay.eway2pay.com/fim/est3dgate"
      >
        <input type="hidden" name="clientid" value={clientid} />
        <input type="hidden" name="storetype" value={storetype} />
        <input type="hidden" name="hash" value={hash} />
        <input type="hidden" name="trantype" value={trantype} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value={currency} />
        <input type="hidden" name="oid" value={oid} />
        <input type="hidden" name="okUrl" value={okUrl} />
        <input type="hidden" name="failUrl" value={failUrl} />
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="rnd" value={rnd} />
        <input type="hidden" name="hashAlgorithm" value={hashAlgorithm} />
        <input type="hidden" name="encoding" value={encoding} />
      </form>
    </>
  );
};

export default PayCardForm;
