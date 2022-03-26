/* Importações React */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, StatusBar, Text, Image, TouchableOpacity } from 'react-native';

/* Importações Plugins */
import { decode } from 'html-entities';
import { Picker } from '@react-native-picker/picker';
import SplashScreen from 'react-native-splash-screen'

/* Importações Locais */
import Api from '../../Service/Api';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import Loading from '../../Component/Loading';
import Functions from '../../Utils/Functions';
import Images from '../../Utils/Images';
import Styles from '../../Utils/Styles';

export default function NewsList({ route, navigation }) {
	/* Props */

	/* States */
	const [loading, setLoading] = useState(false);

	const [categorias, setCategorias] = useState([]);
	const [ordenar, setOrdenar] = useState('');
	const [ordenarOptions, setOrdenarOptions] = useState([
		{ value: '', description: 'Padrão' },
		{ value: 'asc', description: 'A-Z' },
		{ value: 'desc', description: 'Z-A' },
		{ value: 'viewDesc', description: 'Maior visualização' },
		{ value: 'viewAsc', description: 'Menor visualização' }
	]);

	const scrollViewRefs = useRef([]);

	useEffect(() => {
		carregaCategorias();
	}, []);

	const carregaCategorias = async () => {
		await Api.get('categories')
			.then(res => {
				if (res.length) {
					var objects = [];
					for (var i = 0; i < res.length; i++) {
						objects.push({ id: res[i].id, descricao: res[i].name, posts: [], pagina: 1, por_pagina: 4, total: res[i].count, visualizacoes: 0 });
						if ((i+1) === res.length) {
							carregaPosts(objects);
						}
					}
				}
			})
	}

	const carregaPosts = async (categorias) => {
		var categories = categorias;
		for (var i = 0; i < categorias.length; i++) {
			var categoria = categorias[i];
			await Api.get('posts?categories='+categoria.id+'&per_page='+categoria.por_pagina)
				.then(async res => {
					if (res.length) {
						var objects = [], views = 0;
						for (var x = 0; x < res.length; x++) {
							var item = res[x];
							var resumo = Functions.stripHtml(item.excerpt.rendered);
							resumo = Functions.substring(resumo, 50);
							var media = await Api.get('media/'+item.featured_media);
							media = media.guid.rendered;
							objects.push({
								id: item.id,
								titulo: item.title.rendered,
								resumo: resumo,
								imagem: media,
								texto_formatado: item.content.rendered
							});
							views += item.page_views;
							if ((x+1) === res.length) {
								categories[i].posts = objects;
								categories[i].visualizacoes = views;
								if ((i+1) === categorias.length) {
									SplashScreen.hide();
									setOrdenacao(ordenar, categories);
								}
							}
						}
					}
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	const acessaPost = (post) => {
		navigation.navigate("NewsDetail", post);
	}

	const setOrdenacao = (ordenacao, categories) => {
		setLoading(true);
		if (categories === undefined) {
			categories = categorias;
		}
		console.log(categories);
		// Ordena as categorias
		if (ordenacao === 'asc') {
			categories.sort(Functions.orderDescriptionAsc);
		} else if (ordenacao === 'desc') {
			categories.sort(Functions.orderDescriptionDesc);
		} else if (ordenacao === 'viewAsc') {
			categories.sort(Functions.orderViewAsc);
		} else if (ordenacao === 'viewDesc') {
			categories.sort(Functions.orderViewDesc);
		}
		setCategorias(categories);
		setOrdenar(ordenacao);
		setTimeout(function(){
			setLoading(false);
		}, 500);
	}

	return (
		<SafeAreaView style={page_style.container}>

			<StatusBar barStyle="dark-content" backgroundColor="transparent" />

			<Loading show={loading} />

			<Header />

			<ScrollView contentContainerStyle={page_style.conteudo}>

				<View>

					<View style={page_style.ordenacao}>
						<Text style={page_style.ordenacao_label}>Ordenar por: </Text>
						<View style={page_style.ordenacao_select}>
							<Picker style={{ flex: 1 }} selectedValue={ordenar} onValueChange={(itemValue) => { setOrdenacao(itemValue) }}>
								{ordenarOptions.map((item,index) => {
									return (
										<Picker.Item key={"ordenacao-"+item.value} label={item.description} value={item.value} />
									);
								})}
							</Picker>
						</View>
					</View>

					{categorias.map((item,index) => {
						return (
							<View key={'categoria-'+item.id}>
								<View style={page_style.conteudo_titulo}>
									<Text style={[page_style.titulo_lista, Styles.color_blue_default]}>{decode(item.descricao.toUpperCase(),  {level: 'html5'})}</Text>
									<TouchableOpacity style={page_style.ver_mais} onPress={() => { scrollViewRefs.current[index].scrollTo({ x: (scrollViewRefs.current[index].positionX ? scrollViewRefs.current[index].positionX + 270 : 270), animated: true }) }}>
										<Text>VER MAIS ►</Text>
									</TouchableOpacity>
								</View>
								<ScrollView contentContainerStyle={page_style.lista} horizontal={true} ref={el => (scrollViewRefs.current[index] = el)} onScroll={(e) => { scrollViewRefs.current[index].positionX = e.nativeEvent.contentOffset.x }}>
									{item.posts.map((post,indice) => {
										return (
											<TouchableOpacity key={"post"+post.id} style={page_style.item} onPress={() => { acessaPost(post) }}>
												<Image style={page_style.item_imagem} source={{ uri: post.imagem }} resizeMode="cover" />
												<View style={page_style.item_text}>
													<Text style={[page_style.item_titulo, Styles.color_blue_default]}>{decode(post.titulo,  {level: 'html5'})}</Text>
													<Text style={page_style.item_resumo}>{decode(post.resumo,  {level: 'html5'})}</Text>
													<Text style={page_style.item_leiamais}>Leia mais</Text>
												</View>
											</TouchableOpacity>
										);
									})}
								</ScrollView>
							</View>
						);
					})}

				</View>

				<Footer />

			</ScrollView>
			
		</SafeAreaView>
	)
};

const page_style = StyleSheet.create({
	container: { flex: 1, backgroundColor: 'white' },
	conteudo: { flexGrow: 1 },
	conteudo_titulo: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 17, marginTop: 30 },
	titulo_lista: { fontSize: 22, fontWeight: 'bold' },
	ver_mais: { fontSize: 17, color: '#535353', alignSelf: 'center' },
	lista: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingHorizontal: 7 },
	item: { width: 250, borderRadius: 12, elevation: 2, shadowColor: 'black', flex: 1, backgroundColor: 'white', marginHorizontal: 10, marginVertical: 10, paddingBottom: 35 },
	item_imagem: { height: 150, width: 250, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
	item_text: { paddingHorizontal: 10 },
	item_titulo: { fontSize: 17, fontWeight: 'bold', marginTop: 15 },
	item_resumo: { fontSize: 15, color: '#868686', marginTop: 16 },
	item_leiamais: { fontSize: 16, color: '#FDA506', fontWeight: 'bold', marginTop: 15 },
	ordenacao: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 17, alignItems: 'center' },
	ordenacao_label: { fontFamily: 'Roboto', fontSize: 17, color: '#535353', marginRight: 'auto' },
	ordenacao_select: { borderWidth: 1, borderColor: '#E1E1E1', borderRadius: 10, maxWidth: 200, flex: 1 }
});