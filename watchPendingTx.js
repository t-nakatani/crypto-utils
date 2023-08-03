const { Alchemy, Network, AlchemySubscription } = require('alchemy-sdk');

// 未承認トランザクションの監視用の関数
async function watchPendingTransactions(targetAddress, ALCHEMY_KEY, callback) {
  const settings = {
    apiKey: ALCHEMY_KEY,
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(settings);
  alchemy.ws.on(
    {
      method: AlchemySubscription.PENDING_TRANSACTIONS,
      toAddress: targetAddress.toLowerCase(),
    },
    async (tx) => {
        try {
            if (callback && typeof callback === 'function') {
                callback(tx);
            }
        } catch (error) {
            console.error('Callback functionでエラーが発生しました:', error);
            console.log(tx.hash);
        }
    }
  );
}
function closeAlchemyConnection(alchemy) {
    if (alchemy && alchemy.ws) {
        alchemy.ws.close();
    }
}

module.exports = {
  watchPendingTransactions, closeAlchemyConnection
};
