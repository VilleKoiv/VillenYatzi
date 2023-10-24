import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import {DataTable} from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_SCOREBOARD_ROWS, SCORDEBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../style/style';

export default Scoreboard = ({ navigation }) => {
     

    const [scores, setScores] = useState([]);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCORDEBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            }  
        }
        catch(e) {
            console.log('Read error: ' + e);
        }
    }

    const clearScoreboard = async() => {
        try {
            await AsyncStorage.clear();
            setScores([]);
        }
        catch(e) {
            console.log('Clear error: ' + e);
        }
    }


    return(
        <>
        <Header />
        <View>
            <Text style={styles.gameinfo}>PISTETAULU</Text>
            { scores.length === 0 ?
            <Text style={styles.gameinfo}>Pistetaulu on tyhjä</Text>    
            :
            scores.map((player, index) => (
                index < NBR_OF_SCOREBOARD_ROWS && 
                <DataTable.Row key={player.key}>
                    <DataTable.Cell><Text>{index + 1}.</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.name}</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.date}</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.time}</Text></DataTable.Cell>
                    <DataTable.Cell><Text>{player.points}</Text></DataTable.Cell>
                </DataTable.Row>
            ))
            }
        </View>
        <View style={styles.gameboard}>
            <Pressable style={styles.button}
                onPress={() => clearScoreboard()}>
                    <Text style={styles.buttonText}>TYHJENNÄ PISTETAULU</Text>
            </Pressable>
        </View>
        <Footer />
        </>
    )
}