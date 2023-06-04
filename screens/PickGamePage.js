import {Pressable, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {ScrollView} from "react-native-web";

function PickGamePage({navigation}) {

    const [playerId, setPlayerId] = useState("")
    const [players, setPlayers] = useState([])

    useEffect(() => {
        try {
            AsyncStorage.getItem("TheKey")
                .then(value => {
                    setPlayerId(value);
                    console.log(playerId)
                })
        } catch (error) {
            console.log(error)
        }
    }, []);

    const saveGameId = async (gameId) => {
        try {
           await AsyncStorage.setItem('GameId', gameId)
            console.log("Är i SaveGameId med det här game Id: " + gameId)
            navigation.navigate("PLayPage")
        } catch (e) {
            console.log(e)
        }
    }

    const showGames = () => {
        fetch("http://localhost:8080/rock-paper-scissors/games", {
            method: "GET"
        })
            .then(response => response.json()).then((allPlayers) => {
            setPlayers(allPlayers)

        })
    }

    const joinGame =  async (theGameId) => {

            const res = await fetch("http://localhost:8080/rock-paper-scissors/games/join/" + theGameId, {
                method: "GET",
                headers: {
                    token: playerId,
                    "Content-Type": "application/json"
                }
            })
        const data = await res.json();
        saveGameId(data.id)
    }

    const createGame  = async () => {

            const res = await fetch("http://localhost:8080/rock-paper-scissors/games/start", {
                method: "POST",
                headers: {
                    token: playerId,
                    "Content-Type": "application/json"
                }
            })
        const data = await res.json();
        saveGameId(data.id)
    };


    return(

            <View style={styles.body}>

                <Text style={styles.text}>Pick game page</Text>




                <ButtonComp
                    onPress={createGame}
                    title={"CreateGame"}
                    style={styles.button}
                />

                <ButtonComp
                    onPress={showGames}
                    title={"Get me that list of games now!"}
                    style={styles.button}
                />


                <ScrollView>
                    {players.map((item) => {
                        return (
                            <View key={item.id}>
                                <Pressable
                                    onPress={() => joinGame(item.id)}
                                    style={({pressed}) => [
                                        {backgroundColor: pressed ? "#8e8f64" : "#bdcb24"},
                                        styles.button
                                    ]}
                                >
                                    <Text style={styles.buttonText}>{item.name}</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                </ScrollView>

            </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgba(48,73,114,0.87)',
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#3f0528",
        margin: 10,
        padding: 10,
    },
    button: {
        width: 200,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }

});

export default PickGamePage