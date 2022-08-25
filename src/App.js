import { requestProvider } from "webln";
import { useState } from "react";

function App() {
  const [nodeInfo, setNodeInfo] = useState("");
  const [amount, setAmount] = useState(0);
  const [webln, setWebln] = useState("");
  const [paymentRequest, setPaymentRequest] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  async function loadRequestProvider() {
    const webln = await requestProvider();
    const nodeInfo = await webln.getInfo();
    setNodeInfo(nodeInfo.node.alias);
    setWebln(webln);
  }

  async function handleInvoice(e) {
    e.preventDefault();
    const invoice = await webln.makeInvoice(amount);
    console.log(invoice);
    setPaymentRequest(invoice.paymentRequest);
  }

  async function handlePayment() {
    await webln.sendPayment(paymentRequest);
  }

  async function handleSignature(e) {
    e.preventDefault();
    const signature = await webln.signMessage(message);
    setSignature(signature.signature);
  }

  async function verifyMessage() {
    const verification = await webln.verifyMessage(signature, message);
    console.log(verification);
  }

  return (
    <div>
      <h4>Webln tutorial</h4>
      <button onClick={loadRequestProvider}>Connect to provider</button>
      <p>Connected to: {nodeInfo}</p>
      <h4>Create invoice</h4>
      <form onSubmit={handleInvoice}>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          required
        />
        <button>Create invoice</button>
      </form>
      <h4>Pay invoice</h4>
      <button onClick={handlePayment}>Pay invoice</button>
      <h4>Sign message</h4>
      <form onSubmit={handleSignature}>
        <input
          type="string"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        />
        <button>Sign message</button>
      </form>
      <button onClick={verifyMessage}>verify message</button>
    </div>
  );
}

export default App;
