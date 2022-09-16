import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Loading, Background } from './src/components';
import { Routes } from './src/routes';

export default function App() {
    const [fontsLoad] =  useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_900Black
    }); 

    return (
        <Background>
            <StatusBar 
                barStyle='light-content' 
                backgroundColor='transparent' 
                translucent />

            {fontsLoad ? <Routes /> : <Loading />}
        
        </Background>
    );
}