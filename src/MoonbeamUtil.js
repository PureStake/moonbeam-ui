// Helper utility functions for Moonbeam UI

export default function formatBalance (balance) {
  const rawBalance = balance;
  if (rawBalance <= 0) {
    return '0';
  }
  const formattedBalance = (rawBalance / 1000000000000).toFixed(12).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return formattedBalance.toString();
}
