import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Background, Heading, DuoCard, DuoCardProps, DuoMatch } from '../../components';
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordDuoSelected, setDiscordDuoSelected] = useState('');
    const [loading, setLoading] = useState(true);

    const  route = useRoute();
    const  navigation = useNavigation();

    const game = route.params as GameParams;

    function goBack() {
        return navigation.goBack();
    }

    function fetchData () {
        fetch(`http://192.168.0.48:3000/games/${game.id}/ads`)
            .then(response => response.json())
            .then((data) => setDuos(data));  

        setLoading(false);
    }

    function fetchDiscordUser (adsId: string) {
        fetch(`http://192.168.0.48:3000/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => setDiscordDuoSelected(data.discord));
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
                        renderItem={({ item }) => 
                            <DuoCard {...item} 
                                key={item.id} 
                                onConnect={() => fetchDiscordUser(item.id)} 
                            /> 
                        }
                            
                        ListEmptyComponent={() => (
                            <Text style={styles.emptyList}>
                                Não Há anúncios publicados ainda.
                            </Text>
                        )}
                    />
                }

                <DuoMatch visible={discordDuoSelected.length > 0} discord={discordDuoSelected} onCloseModal={() => setDiscordDuoSelected('')} />

            </SafeAreaView>
        </Background>
    
    );
}