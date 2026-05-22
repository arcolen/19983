const SEPOLIA_RPC = 'https://rpc.sepolia.org';
const BACKUP_RPCS = [
  'https://ethereum-sepolia-rpc.publicnode.com',
  'https://1rpc.io/sepolia',
];

async function rpcCall(method: string, params: unknown[]): Promise<unknown> {
  const rpcs = [SEPOLIA_RPC, ...BACKUP_RPCS];
  for (const rpc of rpcs) {
    try {
      const response = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method,
          params,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.result;
    } catch {
      continue;
    }
  }
  throw new Error('All RPC endpoints failed');
}

export async function getBalance(address: string): Promise<string> {
  const result = await rpcCall('eth_getBalance', [address, 'latest']);
  const wei = BigInt(result as string);
  const eth = Number(wei) / 1e18;
  return eth.toFixed(6);
}

export async function getTransactionCount(address: string): Promise<string> {
  const result = await rpcCall('eth_getTransactionCount', [address, 'pending']);
  return result as string;
}

export async function getGasPrice(): Promise<string> {
  const result = await rpcCall('eth_gasPrice', []);
  return result as string;
}

export async function broadcastTransaction(rawTx: string): Promise<string> {
  const result = await rpcCall('eth_sendRawTransaction', [rawTx]);
  return result as string;
}

export async function getTransactionReceipt(txHash: string): Promise<{
  status: string;
  blockNumber: string;
  contractAddress: string | null;
} | null> {
  const result = await rpcCall('eth_getTransactionReceipt', [txHash]);
  return result as unknown as {
    status: string;
    blockNumber: string;
    contractAddress: string | null;
  } | null;
}

export function getSepoliaExplorerUrl(txHash: string): string {
  return `https://sepolia.etherscan.io/tx/${txHash}`;
}

export function getAddressExplorerUrl(address: string): string {
  return `https://sepolia.etherscan.io/address/${address}`;
}

export function weiToEth(wei: string): string {
  const weiBigInt = BigInt(wei);
  const eth = Number(weiBigInt) / 1e18;
  return eth.toFixed(6);
}

export function ethToWei(eth: string): string {
  const ethNum = parseFloat(eth);
  const wei = ethNum * 1e18;
  return '0x' + BigInt(Math.floor(wei)).toString(16);
}
