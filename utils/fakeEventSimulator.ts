export function startFakeEventSimulator() {
  console.log("⚡ Fake Somnia event simulator started");

  // Emit a fake transaction every 5 seconds
  setInterval(() => {
    const fakeTx = {
      user: `0x${Math.random().toString(16).slice(2, 10)}`,
      txHash: `0x${Math.random().toString(16).slice(2, 20)}`,
      amount: Math.floor(Math.random() * 50) + 1,
      timestamp: Date.now(),
    };

    window.dispatchEvent(
      new CustomEvent("somnia:transaction", { detail: fakeTx })
    );
  }, 5000);

  // Emit fake price updates every 8 seconds
  setInterval(() => {
    const fakePrice = {
      newPrice: 0.5 + Math.random() * 0.5,
      timestamp: Date.now(),
    };

    window.dispatchEvent(
      new CustomEvent("somnia:price", { detail: fakePrice })
    );
  }, 8000);

  // Emit active user count every 10 seconds
  setInterval(() => {
    const fakeUsers = {
      userCount: Math.floor(Math.random() * 50),
      timestamp: Date.now(),
    };

    window.dispatchEvent(
      new CustomEvent("somnia:activeUsers", { detail: fakeUsers })
    );
  }, 10000);
}
