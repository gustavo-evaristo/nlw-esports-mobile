import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Background, Heading, DuoCard, DuoCardProps } from '../../components';
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    const  route = useRoute();
    const  navigation = useNavigation();

    const game = route.params as GameParams;

    function goBack() {
        return navigation.goBack();
    }

    function fetchData ()  {
        fetch(`http://192.168.0.48:3000/games/${game.id}/ads`)
            .then(response => response.json())
            .then((data) => setDuos(data));  

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
        
    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={goBack}
                    >
                        <Entypo 
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />

                    </TouchableOpacity>

                    <Image source={LogoImg} style={styles.logo} />

                    <View style={styles.right}/>
                </View>

                <Image 
                    style={styles.cover}
                    source={{ uri: game.banner }}
                    resizeMode="cover"
                />

                <Heading 
                    title={game.title}
                    subtitle='conecte-se e comece a jogar!'
                />

                {loading
                    ?  <ActivityIndicator size={20} color={THEME.COLORS.TEXT} />
                    : <FlatList 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={duos}
                        style={styles.containerList}
                        contentContainerStyle={duos.length === 0 ? styles.emptyListContent : styles.contentList }
                        keyExtractor={item => item.id}
                        //eslint-disable-next-line
                        renderItem={({ item }) => <DuoCard {...item} key={item.id} onConnect={() => {}} /> }
                        ListEmptyComponent={() => (
                            <Text style={styles.emptyList}>
                                Não Há anúncios publicados ainda.
                            </Text>
                        )}
                    />
                }

            </SafeAreaView>
        </Background>
    
    );
}