interface IndexPriceRecord {
  // Basically an ID
  symbol: string;
  name: string;
  lastPrice: number;
  change: number;
  // Rate in %
  changeRate: number;
  // Let's use ISOTimestamp
  time: string;
}
export default IndexPriceRecord