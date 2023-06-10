import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import ButtonComp from "../components/ButtonComp";


function WelcomeRPS({navigation}) {

    const goToRulesPage = () => {
        navigation.navigate("RulesPage")
    }
    const goToLorePage = () => {
        navigation.navigate("LorePage")
    }

    const goToNamePage = () => {
        navigation.navigate("NamePage")
    }

    return(
        <View style={styles.body}>
            <Text style={styles.textWelcome}>
                Rock, Paper, Scissor
            </Text>
            <ButtonComp
                onPress={goToNamePage}
                title={"Play game"}
                style={styles.button}
            />
            <ButtonComp
                onPress={goToRulesPage}
                title={"Rules"}
                style={styles.button}
            />
            <ButtonComp
                onPress={goToLorePage}
                title={"Lore"}
                style={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'rgba(48,73,114,0.87)',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    text: {
        color: "rgba(48,73,114,0.87)",
        fontWeight: "bold",
        fontSize: 30
    },
    textWelcome: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30
    },

});

export default WelcomeRPS