import { 
  Pressable, 
  StyleSheet, 
  Text, 
  View, 
  Switch, 
  Alert  
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorMode } from '../functions/contexts/colorModeContext';

export default function SettingsPage() {

    const { colorMode, switchMode } = useColorMode(); // true = dark, false = light
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            Alert.alert('Odhlášeno', 'Token byl smazán.');
            navigation.navigate('Login');
        } catch (err) {
            console.error('Chyba při mazání tokenu:', err);
        }
    };

    // Dynamické barvy podle colorMode
    const themeStyles = {
        backgroundColor: colorMode ? "#121212" : "#fff",
        textColor: colorMode ? "#fff" : "#000",
        secondaryTextColor: colorMode ? "#ccc" : "#555",
        switchTrackColor: colorMode ? "#444" : "#ccc",
        switchThumbColor: colorMode ? "#00bfff" : "#00bfff"
    };

    return (
        <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <Text style={[styles.header, { color: themeStyles.textColor }]}>Settings</Text>

            <Pressable onPress={handleLogout} style={styles.row}>
                <Ionicons name="log-out-outline" size={28} color="red" />
                <Text style={[styles.text, { color: themeStyles.textColor }]}>Logout</Text>
            </Pressable>

            <View style={styles.row}>
                <Text style={[styles.text, { color: themeStyles.textColor }]}>Color mode</Text>

                <Switch 
                    value={colorMode}
                    onValueChange={switchMode}
                    trackColor={{ true: themeStyles.switchTrackColor, false: themeStyles.switchTrackColor }}
                    thumbColor={themeStyles.switchThumbColor}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 18,
    }
});
