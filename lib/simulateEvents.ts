interface Transaction {
  user: string;
  txHash: string;
  amount: number;
  timestamp: number;
}

interface TokenPrice {
  newPrice: number;
  timestamp: number;
}

interface ActiveUsers {
  userCount: number;
  timestamp: number;
}

// Generate random wallet address
const randomWallet = () =>
  "0x" + Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0");

// Generate random transaction hash
const randomTxHash = () =>
  "0x" + Math.floor(Math.random() * 1e16).toString(16).padStart(16, "0");

// Start simulation
export function startEventSimulation() {
  console.log("✅ Starting local event simulation...");

  setInterval(() => {
    // Simulate TransactionStream
    const tx: Transaction = {
      user: randomWallet(),
      txHash: randomTxHash(),
      amount: +(Math.random() * 100).toFixed(2),
      timestamp: Date.now(),
    };
    window.dispatchEvent(
      new CustomEvent("somnia:transaction", { detail: tx })
    );
  }, 2000); // every 2 seconds

  setInterval(() => {
    // Simulate TokenPriceUpdated
    const price: TokenPrice = {
      newPrice: +(Math.random() * 5).toFixed(4),
      timestamp: Date.now(),
    };
    window.dispatchEvent(
      new CustomEvent("somnia:price", { detail: price })
    );
  }, 3000); // every 3 seconds

  setInterval(() => {
    // Simulate ActiveUsersUpdated
    const users: ActiveUsers = {
      userCount: Math.floor(Math.random() * 1000),
      timestamp: Date.now(),
    };
    window.dispatchEvent(
      new CustomEvent("somnia:activeUsers", { detail: users })
    );
  }, 4000); // every 4 seconds
}
