export interface TimeData {
    updated: string;
    updatedISO: string;
    updateduk: string;
}

export interface CurrencyData {
    code: string;
    symbol: string;
    rate: string;
    description: string;
    rate_float: number;
}

export interface BpiData {
    USD: CurrencyData;
    GBP: CurrencyData;
    EUR: CurrencyData;
}

 export interface BitcoinPriceIndex {
    time: TimeData;
    disclaimer: string;
    chartName: string;
    bpi: BpiData;
}