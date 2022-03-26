/* Importações React */
import React, { useEffect } from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Rotas */
import NewsList from '../Pages/News/List';
import NewsDetail from '../Pages/News/Detail';

/* Navigator sem menu */
const Stack = createNativeStackNavigator();

const Routes: () => Node = () => {

	return (
		<NavigationContainer>

			<Stack.Navigator screenOptions={{ headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 } }} initialRouteName="NewsList" screenOptions={{ headerShown: false }}>
				
				<Stack.Screen key="stack-0" name="NewsList" component={NewsList} options={{ gestureEnabled: false }} />
				<Stack.Screen key="stack-1" name="NewsDetail" component={NewsDetail} options={{ gestureEnabled: false }} />
				
			</Stack.Navigator>

		</NavigationContainer>
	)
}

export default Routes;