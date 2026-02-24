import { create } from 'zustand';

interface StockStatistic {
	symbol: string;
	name: string;
	change: number;
	price: number;
}

interface NewsItem {
	id: string;
	title: string;
	summary: string;
	url: string;
	date: string;
	source: string;
}

interface MarketState {
	marketStatus: 'open' | 'closed';
	summary: string;
	topGainers: StockStatistic[];
	topLosers: StockStatistic[];
	news: NewsItem[];
	setMarketStatus: (status: 'open' | 'closed') => void;
	setSummary: (summary: string) => void;
	setTopGainers: (gainers: StockStatistic[]) => void;
	setTopLosers: (losers: StockStatistic[]) => void;
	setNews: (news: NewsItem[]) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
	marketStatus: 'closed',
	summary: 'Carregando dados do mercado...',
	topGainers: [],
	topLosers: [],
	news: [],
	setMarketStatus: (status) => set({ marketStatus: status }),
	setSummary: (summary) => set({ summary }),
	setTopGainers: (gainers) => set({ topGainers: gainers }),
	setTopLosers: (losers) => set({ topLosers: losers }),
	setNews: (news) => set({ news: news }),
}));
