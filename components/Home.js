import { useState } from "react";
import { TextInput, Text, View, Pressable, Keyboard } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import {NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS} from '../constants/Game';
import styles from '../style/style';

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayername, setHasPlayername] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayername(true);
            Keyboard.dismiss();
        }
    }

    return(
        <>
            <Header />
            <View style={styles.gameboard}>
                <MaterialCommunityIcons name="information" size={90} color="red" />
                {!hasPlayername ?
                <>
                    <Text>Syötä nimesi pistetaulua varten</Text>
                    <TextInput onChangeText={setPlayerName} autoFocus={true}/>
                    <Pressable style={styles.button}
                        onPress={() => handlePlayerName(playerName)}
                        ><Text>OK</Text>
                    </Pressable>
                </>
                :
                <>
                    <Text>SÄÄNNÖT</Text>
                    <Text multiline="true" style={styles.gameinfo}>
                        THE GAME: Upper section of the classic Yahtzee 
                        dice game. You have {NBR_OF_DICES} dices and 
                        for the every dice you have {NBR_OF_THROWS} throws. 
                        After each throw you can keep dices in 
                        order to get same dice spot counts as many as 
                        possible. In the end of the turn you must select 
                        your points from {MIN_SPOT} to {MAX_SPOT}. 
                        Game ends when all points have been selected. 
                        The order for selecting those is free.

                        GOAL: To get points as much as possible. 
                        {BONUS_POINTS_LIMIT} points is the limit of 
                        getting bonus which gives you {BONUS_POINTS} points more.
                    </Text>
                    <Text multiline="true" style={styles.gameinfo}>POINTS: 
                        After each turn game calculates the sum 
                        for the dices you selected. Only the dices having 
                        the same spot count are calculated. Inside the 
                        game you can not select same points 
                        from {MIN_SPOT} to {MAX_SPOT} again.
                    </Text>
                    <Text multiline="true" style={styles.gameinfo}>GOAL: 
                        To get points as much as possible. 
                        {BONUS_POINTS_LIMIT} points is the limit of 
                        getting bonus which gives you {BONUS_POINTS}  points more.
                    </Text>
                    <Text>Good luck, {playerName}</Text>
                    <Pressable style={styles.button}
                        onPress={()=> navigation.navigate('Gameboard', {player: playerName})}
                    >
                        <Text>PELAA</Text>
                    </Pressable>
                </>
                }
            </View>
            <Footer />
        </>
    )


}