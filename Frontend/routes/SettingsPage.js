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
import { useLanguage } from '../functions/contexts/languageContext';

export default function SettingsPage() {

    const { colorMode, switchMode } = useColorMode(); 
    const { t, language, switchLanguage } = useLanguage(); // 🆕 přidáno
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            Alert.alert(t("logout_alert_title"), t("logout_alert_message"));
            navigation.navigate('Login');
        } catch (err) {
            console.error('Chyba při mazání tokenu:', err);
        }
    };

    const themeStyles = {
        backgroundColor: colorMode ? "#121212" : "#fff",
        textColor: colorMode ? "#fff" : "#000",
        secondaryTextColor: colorMode ? "#ccc" : "#555",
        switchTrackColor: colorMode ? "#444" : "#ccc",
        switchThumbColor: colorMode ? "#00bfff" : "#00bfff"
    };

    return (
        <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>

            {/* Header */}
            <Text style={[styles.header, { color: themeStyles.textColor }]}>
                {t("settings_header")}
            </Text>

            {/* Logout */}
            <Pressable onPress={handleLogout} style={styles.row}>
                <Ionicons name="log-out-outline" size={28} color="red" />
                <Text style={[styles.text, { color: themeStyles.textColor }]}>
                    {t("logout")}
                </Text>
            </Pressable>

            {/* Color mode */}
            <View style={styles.row}>
                <Text style={[styles.text, { color: themeStyles.textColor }]}>
                    {t("color_mode")}
                </Text>
                <Switch 
                    value={colorMode}
                    onValueChange={switchMode}
                    trackColor={{ true: themeStyles.switchTrackColor, false: themeStyles.switchTrackColor }}
                    thumbColor={themeStyles.switchThumbColor}
                />
            </View>

            {/* Language switch */}
            <Pressable 
                onPress={switchLanguage} 
                style={[styles.row, { justifyContent: "flex-start", gap: 10 }]}
            >
                <Text style={[styles.text, { color: themeStyles.textColor }]}>
                    {t("language")}:
                </Text>
                <Text style={[styles.text, { fontWeight: "bold", color: themeStyles.textColor }]}>
                    {language.toUpperCase()}
                </Text>
            </Pressable>

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
