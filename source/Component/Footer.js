/* Importações React */
import React from 'react';
import { TouchableOpacity, ImageBackground, Text, Image, View, StyleSheet, Linking } from 'react-native';

/* Importações Plugins */

/* Importações Locais */
import Styles from '../Utils/Styles';
import Images from '../Utils/Images';

export default function Footer({  }){

    const conhecerPlataforma = async () => {
        var abrir = await Linking.openURL('https://coursify.me');
    }

    return(
        <View style={page_style.footer}>
            <Image source={Images.default.logo_white} style={page_style.logo} resizeMode="contain" />
            <Text style={page_style.texto}>O Coursify.me é uma plataforma de ensino a distância, onde qualquer pessoa ou empresa pode construir seu EAD e vender cursos pela internet.</Text>
            <TouchableOpacity style={page_style.botao} onPress={() => { conhecerPlataforma() }}>
                <Text style={page_style.botao_texto}>Quero conhecer a plataforma!</Text>
            </TouchableOpacity>
        </View>
    );
}

const page_style = StyleSheet.create({
    footer: { backgroundColor: '#1ABC9C', padding: 24, flexDirection: 'column', marginTop: 60 },
    logo: { width: 172, marginBottom: 11, alignSelf: 'center' },
    texto: { fontSize: 12, color: 'white', textAlign: 'center', marginBottom: 11, maxWidth: '80%', alignSelf: 'center' },
    botao: { backgroundColor: '#FFA900', padding: 17, borderRadius: 60 },
    botao_texto: { fontSize: 12, color: '#FFFFFF', width: '100%', textAlign: 'center' }
});