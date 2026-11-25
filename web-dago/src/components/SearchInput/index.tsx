import useDebounce from "@/hooks/useDebounce";
import { useTranslation } from "@/i18n";
import { Search } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import InputText from "../Input/InputText";

type SearchInputProps = {
    delay?: number;
    defaultValue?: string;
    onSearch: (value: string) => void;
    placeholder?: string;
};

export default function SearchInput({
    delay = 1000,
    defaultValue = "",
    onSearch,
    placeholder,
}: SearchInputProps) {
    const { t } = useTranslation();
    const [keyword, setKeyword] = useState(defaultValue);
    const debouncedKeyword = useDebounce(keyword, delay);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        onSearch(debouncedKeyword.trim());
    }, [debouncedKeyword, onSearch]);

    return (
        <View className="relative">
            <Search
                color="#64748b"
                size={20}
                style={{ position: "absolute", left: 16, top: 14, zIndex: 10 }}
            />
            <InputText
                value={keyword}
                onChangeText={setKeyword}
                placeholder={placeholder ?? t("search.placeholder")}
                placeholderTextColor="#64748b"
                className="h-12 rounded-full border-0 bg-surface text-base text-text-primary"
                style={{ paddingLeft: 48, paddingRight: 16 }}
            />
        </View>
    );
}