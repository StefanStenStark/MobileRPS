import {StyleSheet, Text, View} from "react-native";
import ButtonComp from "../components/ButtonComp";


function LorePage({navigation}) {

    const goToWelcomePage = () => {
        navigation.navigate("WelcomeRPS")
    }
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Rock Paper Scissors is considered the oldest hand game in the world.

            </Text>
            <Text style={styles.text}>
                In fact, the game dates all the way back to the Chinese Han Dynasty.
                This era began in 206 BC and ended in 220 AD.
            </Text>
            <Text style={styles.text}>
                There are also accounts of this game in Japanese history.
            </Text>
            <ButtonComp
                onPress={goToWelcomePage}
                title={"ok"}
                style={styles.button}
            />
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
        fontSize: 18,
        alignItems: "center"
    }
});

export default LorePage
