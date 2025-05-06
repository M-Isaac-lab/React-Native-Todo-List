import {Text, TextProps} from "react-native";
import {styles} from "@/styles/ThemeText_Styles";


type Props = TextProps & {
    variant?: keyof typeof styles;
    color?: string;
}

export default function  ThemedText({variant, color, ...rest} : Props){

    return <Text style={styles[variant ?? 'body3']} {...rest} />
}

