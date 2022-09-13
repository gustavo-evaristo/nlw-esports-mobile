import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    TouchableOpacity,
    ImageBackground,
    ImageSourcePropType,
    TouchableOpacityProps,
    Text,
} from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

export interface GameCardProps extends TouchableOpacityProps {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
}

export function GameCard({ id, name, ads, cover }: GameCardProps) {
    return (
        <TouchableOpacity style={styles.container} key={id} activeOpacity={0.7}>
            <ImageBackground style={styles.cover} source={cover}>
                <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
                    <Text style={styles.name}>{name}</Text>

                    <Text style={styles.ads}>{ads} anúncios</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}
