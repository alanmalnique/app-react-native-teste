/* Importações React */
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, StatusBar, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

/* Importações Plugins */
import HTML from "react-native-render-html";
import { decode } from 'html-entities';

/* Importações Locais */
import Api from '../../Service/Api';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import Loading from '../../Component/Loading';
import Functions from '../../Utils/Functions';
import Images from '../../Utils/Images';
import Styles from '../../Utils/Styles';

export default function NewsList({ route, navigation: { goBack } }) {
	/* Props */
	const props = route.params;

	/* States */
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		
	}, []);

	const tagsStyles = {
		a: { fontFamily: 'Roboto', fontSize: 17, fontWeight: 'bold', color: '#2AB598' },
		p: { fontFamily: 'Roboto', fontSize: 17, color: '#666666' },
		li: { fontFamily: 'Roboto', fontSize: 17, color: '#666666', marginBottom: 10 }
	};

	return (
		<SafeAreaView style={page_style.container}>

			<Loading show={loading} />

			<Header acao_voltar={() => { goBack() }} />

			<ScrollView contentContainerStyle={page_style.conteudo}>

				<Text style={[page_style.titulo, Styles.color_blue_default]}>{decode(props.titulo,  {level: 'html5'})}</Text>

				<Image style={page_style.imagem} source={{ uri: props.imagem }} resizeMode="cover" />

				<View style={{ paddingHorizontal: 17 }}>
					<HTML tagsStyles={tagsStyles} contentWidth={Dimensions.get('window').width - 34} onLoadStart={() => { setLoading(true) }} onLoadEnd={() => setLoading(false) } source={{ html: props.texto_formatado }} />
				</View>
				
				<Footer />

			</ScrollView>
			
		</SafeAreaView>
	)
};

const page_style = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'white' },
	conteudo: { flexGrow: 1 },
	titulo: { fontFamily: 'Roboto', fontSize: 17, fontWeight: 'bold', marginTop: 30, paddingHorizontal: 17 },
	imagem: { width: Dimensions.get('window').width - 34, marginHorizontal: 17, height: (Dimensions.get('window').width - 34) / (16/9), marginTop: 17, borderRadius: 12 }
});