/* Importações React */
import React from 'react';
import { TouchableOpacity, ImageBackground, Text, Image, View, StyleSheet } from 'react-native';

/* Importações Plugins */

/* Importações Locais */
import Styles from '../Utils/Styles';
import Images from '../Utils/Images';

export default function Header({ acao_voltar, navigation }){
    return(
        <View style={page_style.header}>
            {acao_voltar !== undefined ? (
                <TouchableOpacity style={page_style.voltar} onPress={acao_voltar}>
                    <Image source={Images.icons.arrow_back} style={page_style.voltar_icon} resizeMode="contain" />
                </TouchableOpacity>
            ) : null}
            <Image source={Images.default.logo} style={page_style.logo} resizeMode="contain" />
            <TouchableOpacity style={page_style.botao_filtrar}>
                <View style={[page_style.hamburger, { marginTop: 10 }]}></View>
                <View style={page_style.hamburger}></View>
                <View style={page_style.hamburger}></View>
            </TouchableOpacity>
        </View>
    );
}

const page_style = StyleSheet.create({
    header: { height: 64, zIndex: 2, backgroundColor: 'white', shadowColor: 'black', elevation: 6, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 17 },
    logo: { width: 169, alignSelf: 'center', marginRight: 'auto' },
    botao_filtrar: { width: 37, height: 37, borderRadius: 37, alignSelf: 'center', backgroundColor: '#3CC6AA', flexDirection: 'column' },
    hamburger: { width: 21, height: 3, backgroundColor: 'white', borderRadius: 3, alignSelf: 'center', marginTop: 3 },
    voltar: { marginRight: 17, alignSelf: 'center' },
    voltar_icon: { width: 20 }
});