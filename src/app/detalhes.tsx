import React from 'react';
import {useLocalSearchParams} from 'expo-router';
import DetScreen from '../../screens/detScreen';

export default function Detalhes(){
    const {id} = useLocalSearchParams<{id: string}>();

    return <DetScreen id = {id} />;
}