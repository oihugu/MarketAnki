import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { TrendingUp, Newspaper, BrainCircuit, ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react-native';
import { useMarketStore } from '../src/store/useMarketStore';
import { fetchTopGainersLosers, fetchNewsFromRSS } from '../src/services/marketDataService';

export default function Dashboard() {
	const {
		marketStatus, summary, topGainers, topLosers, news, isLoading,
		setTopGainers, setTopLosers, setNews, setSummary, setLoading
	} = useMarketStore();

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			try {
				const { gainers, losers } = await fetchTopGainersLosers();
				setTopGainers(gainers);
				setTopLosers(losers);

				const latestNews = await fetchNewsFromRSS();
				setNews(latestNews);

				if (gainers.length > 0) {
					setSummary(`O mercado apresenta movimentações interessantes hoje. ${gainers[0].symbol} lidera as altas com ${gainers[0].change.toFixed(2)}%.`);
				}
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	const renderStockCard = (stock: any, isGainer: boolean) => (
		<View key={stock.symbol} style={styles.stockItem}>
			<View>
				<Text style={styles.stockSymbol}>{stock.symbol}</Text>
				<Text style={styles.stockName} numberOfLines={1}>{stock.name}</Text>
			</View>
			<View style={styles.stockValues}>
				<Text style={styles.stockPrice}>R$ {stock.price.toFixed(2)}</Text>
				<View style={styles.changeRow}>
					{isGainer ? <ArrowUpRight size={14} color="#10b981" /> : <ArrowDownRight size={14} color="#ef4444" />}
					<Text style={[styles.stockChange, { color: isGainer ? '#10b981' : '#ef4444' }]}>
						{stock.change.toFixed(2)}%
					</Text>
				</View>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
					<Text style={styles.title}>MarketAnki</Text>
					<View style={[styles.statusBadge, marketStatus === 'open' ? styles.statusOpen : styles.statusClosed]}>
						<Text style={styles.statusText}>
							B3: {marketStatus === 'open' ? 'ABERTO' : 'FECHADO'}
						</Text>
					</View>
				</View>

				{/* Resumo IA Section */}
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<BrainCircuit color="#8b5cf6" size={24} />
						<Text style={styles.cardTitle}>Insights do Dia</Text>
					</View>
					<Text style={styles.cardBody}>{summary}</Text>
				</View>

				{/* Maiores Altas e Baixas */}
				<View style={styles.sectionHeader}>
					<TrendingUp color="#3b82f6" size={20} />
					<Text style={styles.sectionTitle}>Maiores Movimentações (B3)</Text>
				</View>

				<View style={styles.row}>
					<View style={styles.stockColumn}>
						<Text style={styles.columnLabel}>Altas</Text>
						{isLoading ? <Text style={styles.emptyText}>Buscando...</Text> : (topGainers.length > 0 ? topGainers.map(s => renderStockCard(s, true)) : <Text style={styles.emptyText}>Sem dados</Text>)}
					</View>
					<View style={[styles.stockColumn, { marginLeft: 16 }]}>
						<Text style={styles.columnLabel}>Baixas</Text>
						{isLoading ? <Text style={styles.emptyText}>Buscando...</Text> : (topLosers.length > 0 ? topLosers.map(s => renderStockCard(s, false)) : <Text style={styles.emptyText}>Sem dados</Text>)}
					</View>
				</View>

				{/* Notícias Section */}
				<View style={styles.sectionHeader}>
					<Newspaper color="#10b981" size={20} />
					<Text style={styles.sectionTitle}>Últimas Notícias</Text>
				</View>

				{isLoading ? (
					<Text style={styles.emptyText}>Carregando feeds...</Text>
				) : (
					news.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={styles.newsCard}
							onPress={() => Linking.openURL(item.url)}
						>
							<View style={styles.newsHeader}>
								<Text style={styles.newsSource}>{item.source}</Text>
								<ExternalLink size={14} color="#666" />
							</View>
							<Text style={styles.newsTitle}>{item.title}</Text>
							<Text style={styles.newsSummary}>{item.summary}</Text>
						</TouchableOpacity>
					))
				)}

				<View style={{ height: 40 }} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0a0a0a',
	},
	scrollContent: {
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		letterSpacing: 0.5,
	},
	statusBadge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
	},
	statusOpen: {
		backgroundColor: '#064e3b',
	},
	statusClosed: {
		backgroundColor: '#450a0a',
	},
	statusText: {
		color: '#fff',
		fontSize: 10,
		fontWeight: '700',
	},
	card: {
		backgroundColor: '#1a1a1a',
		borderRadius: 16,
		padding: 20,
		marginBottom: 24,
		borderWidth: 1,
		borderColor: '#333',
		elevation: 4,
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#fff',
		marginLeft: 10,
	},
	cardBody: {
		fontSize: 14,
		lineHeight: 22,
		color: '#e5e5e5',
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
		marginTop: 8,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#fff',
		marginLeft: 10,
	},
	row: {
		flexDirection: 'row',
		marginBottom: 24,
	},
	stockColumn: {
		flex: 1,
	},
	columnLabel: {
		fontSize: 12,
		color: '#888',
		fontWeight: '600',
		marginBottom: 8,
		textTransform: 'uppercase',
	},
	stockItem: {
		backgroundColor: '#1a1a1a',
		padding: 12,
		borderRadius: 12,
		marginBottom: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#262626',
	},
	stockSymbol: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#fff',
	},
	stockName: {
		fontSize: 10,
		color: '#666',
		maxWidth: 80,
	},
	stockValues: {
		alignItems: 'flex-end',
	},
	stockPrice: {
		fontSize: 13,
		color: '#fff',
		fontWeight: '600',
	},
	changeRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	stockChange: {
		fontSize: 11,
		fontWeight: 'bold',
		marginLeft: 2,
	},
	newsCard: {
		backgroundColor: '#1a1a1a',
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#262626',
	},
	newsHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	newsSource: {
		fontSize: 10,
		color: '#3b82f6',
		fontWeight: '700',
		textTransform: 'uppercase',
	},
	newsTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#fff',
		marginBottom: 8,
	},
	newsSummary: {
		fontSize: 13,
		color: '#a3a3a3',
		lineHeight: 18,
	},
	emptyText: {
		color: '#666',
		fontSize: 12,
		fontStyle: 'italic',
	}
});
