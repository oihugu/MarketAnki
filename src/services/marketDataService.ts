import { XMLParser } from 'fast-xml-parser';
import { StockStatistic, NewsItem } from '../types/market';

const BRAPI_BASE_URL = 'https://brapi.dev/api';
// Nota: Em um app real, o token deve vir de uma variável de ambiente (.env)
const BRAPI_TOKEN = '';

export const fetchTopGainersLosers = async () => {
	try {
		// Brapi quote endpoint for top gainers/losers
		// Se sem token, pode falhar em produção, mas vamos tentar o endpoint de listagem que as vezes funciona
		const response = await fetch(`${BRAPI_BASE_URL}/quote/list?sortBy=change&sortOrder=desc&limit=5`);
		const data = await response.json();

		if (data.stocks) {
			return {
				gainers: data.stocks.slice(0, 5).map((s: any) => ({
					symbol: s.stock,
					name: s.name,
					change: s.change,
					price: s.close
				})),
				losers: [...data.stocks].reverse().slice(0, 5).map((s: any) => ({
					symbol: s.stock,
					name: s.name,
					change: s.change,
					price: s.close
				}))
			};
		}
	} catch (error) {
		console.error('Error fetching B3 data:', error);
	}
	return { gainers: [], losers: [] };
};

export const fetchNewsFromRSS = async () => {
	const RSS_FEEDS = [
		{ name: 'InfoMoney', url: 'https://www.infomoney.com.br/feed/' },
		{ name: 'G1 Economia', url: 'https://g1.globo.com/rss/g1/economia/' }
	];

	const allNews: any[] = [];
	const parser = new XMLParser();

	for (const feed of RSS_FEEDS) {
		try {
			const response = await fetch(feed.url);
			const xmlData = await response.text();
			const jsonObj = parser.parse(xmlData);

			const items = jsonObj.rss?.channel?.item || [];
			const newsItems = (Array.isArray(items) ? items : [items]).slice(0, 5).map((item: any) => ({
				id: item.guid || item.link,
				title: item.title,
				summary: item.description?.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...',
				url: item.link,
				date: item.pubDate,
				source: feed.name
			}));

			allNews.push(...newsItems);
		} catch (error) {
			console.error(`Error fetching RSS from ${feed.name}:`, error);
		}
	}

	return allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
