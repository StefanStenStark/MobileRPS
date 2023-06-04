import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";
import {gameInfoUpdate} from "../Fetches";

function RulesPage({navigation}) {

    const goToWelcomePage = () => {
        navigation.navigate("WelcomeRPS")
    }

    return(

            <View style={styles.body}>

                <Text style={styles.text}>Rules page</Text>
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

export default RulesPage