import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
	return (
		<>
			<StatusBar style="auto" />
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#1a1a1a',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				<Stack.Screen name="index" options={{ title: 'MarketAnki' }} />
			</Stack>
		</>
	);
}
