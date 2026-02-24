export interface StockStatistic {
	symbol: string;
	name: string;
	change: number;
	price: number;
}

export interface NewsItem {
	id: string;
	title: string;
	summary: string;
	url: string;
	date: string;
	source: string;
}

export interface MarketState {
	marketStatus: 'open' | 'closed';
	summary: string;
	topGainers: StockStatistic[];
	topLosers: StockStatistic[];
	news: NewsItem[];
	isLoading: boolean;
	setMarketStatus: (status: 'open' | 'closed') => void;
	setSummary: (summary: string) => void;
	setTopGainers: (gainers: StockStatistic[]) => void;
	setTopLosers: (losers: StockStatistic[]) => void;
	setNews: (news: NewsItem[]) => void;
	setLoading: (loading: boolean) => void;
}
