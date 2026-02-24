import { create } from 'zustand';
import { MarketState, StockStatistic, NewsItem } from '../types/market';

export const useMarketStore = create<MarketState>((set) => ({
	marketStatus: 'closed',
	summary: 'Carregando dados do mercado...',
	topGainers: [],
	topLosers: [],
	news: [],
	isLoading: false,
	setMarketStatus: (status) => set({ marketStatus: status }),
	setSummary: (summary) => set({ summary }),
	setTopGainers: (gainers) => set({ topGainers: gainers }),
	setTopLosers: (losers) => set({ topLosers: losers }),
	setNews: (news) => set({ news: news }),
	setLoading: (loading) => set({ isLoading: loading }),
}));
