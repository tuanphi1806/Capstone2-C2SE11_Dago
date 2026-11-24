import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {
    size?: number;
    color?: string;
}

export default function CheckIcon({ size = 20, color, ...props }: Props) {
    return (
        <Svg
            viewBox="0 0 20 20"
            width={size}
            height={size}
            color={color}
            {...props}
        >
            <Path
                fill="currentColor"
                d="M8.29515 14C8.05503 14 7.82691 13.9107 7.65883 13.7544L4.26113 10.5957C3.91296 10.2721 3.91296 9.73631 4.26113 9.41263C4.6093 9.08894 5.18559 9.08894 5.53377 9.41263L8.29515 11.9798L14.4662 6.24276C14.8144 5.91908 15.3907 5.91908 15.7389 6.24276C16.087 6.56645 16.087 7.1022 15.7389 7.42588L8.93147 13.7544C8.76338 13.9107 8.53527 14 8.29515 14Z"
            />
        </Svg>
    );
}