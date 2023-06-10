import {Pressable, StyleSheet, Text} from "react-native";

function ButtonComp({onPress,color,style,title}) {
    return <Pressable
        onPress={onPress}
        style={({pressed}) => [
            {backgroundColor: pressed ? "#ffe7af" : color},
            styles.button,
            {...style}
        ]}
    >
        <Text style={styles.buttonText}>
            {title}
        </Text>
    </Pressable>;
}
ButtonComp.defaultProps = {
    color: "#e1cd4a"
}

const styles = StyleSheet.create({
    buttonText: {
        color: "rgba(48,73,114,0.87)",
        fontWeight: "bold",
        fontSize: 20
    },
    button: {
        flexDirection: "row",
        width: 200,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 35,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 20,
        marginTop: 20
    },
});

export default ButtonComp

