import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    TouchableOpacity,
    ImageBackground,
    TouchableOpacityProps,
    Text,
} from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export interface GameCardProps extends TouchableOpacityProps {
  id: string;
  title: string;
  _count: {
    Ads: number;
  }
  banner: string;
}

export function GameCard({ id, title, _count: { Ads }, banner, ...rest }: GameCardProps) {
    return (
        <TouchableOpacity { ...rest } style={styles.container} key={id} activeOpacity={0.7}>
            <ImageBackground style={styles.cover} source={{ uri: banner }}>
                <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
                    <Text style={styles.name}>{title}</Text>

                    <Text style={styles.ads}>{Ads} {Ads === 1 ? 'anúncio' : 'anúncios'}</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}
