import React from 'react';
import { View, Image, FlatList } from 'react-native';
import Logo from '../../assets/logo-nlw-esports.png';
import { GameCard, Heading } from '../../components';
import FortniteImage from '../../assets/games/game-5.png';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

export function Home() {
    return (
        <View style={styles.container}>
            <Image 
                source={Logo}
                style={styles.logo}
            />

            <Heading 
                title='Encontre seu duo!'
                subtitle='Selecione o game que deseja jogar...'
            />

            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
                data={GAMES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <GameCard {...item} />
                )}

            />

        </View>
    );
}