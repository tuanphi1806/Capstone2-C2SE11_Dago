import { useTranslation } from "@/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function getPageNumbers(
    page: number,
    totalPages: number,
): (number | "ellipsis")[] {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) {
        return [1, 2, "ellipsis", totalPages - 1, totalPages];
    }

    if (page >= totalPages - 2) {
        return [1, 2, "ellipsis", totalPages - 1, totalPages];
    }

    return [1, "ellipsis", page, "ellipsis", totalPages];
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    const { t } = useTranslation();

    if (totalPages <= 1) {
        return null;
    }

    const pages = getPageNumbers(page, totalPages);

    return (
        <View className="w-fit flex-row items-center justify-center gap-1 bg-accent">
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("a11y.prevPage")}
                className="h-5 w-5 items-center justify-center active:opacity-80 disabled:opacity-40"
                disabled={page <= 1}
                onPress={() => onPageChange(page - 1)}
            >
                <ChevronLeft color="#ffffff" size={18} />
            </Pressable>

            {pages.map((item, index) =>
                item === "ellipsis" ? (
                    <Text
                        key={`ellipsis-${index}`}
                        className="px-1 text-sm text-white/80"
                    >
                        ...
                    </Text>
                ) : (
                    <Pressable
                        key={item}
                        accessibilityRole="button"
                        accessibilityLabel={t("a11y.page", { n: item })}
                        className={`h-6 w-6 items-center justify-center active:opacity-80 ${
                            item === page ? "bg-primary" : ""
                        }`}
                        onPress={() => onPageChange(item)}
                    >
                        <Text
                            className={`text-xs font-semibold ${
                                item === page ? "text-accent" : "text-white"
                            }`}
                        >
                            {item}
                        </Text>
                    </Pressable>
                ),
            )}

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("a11y.nextPage")}
                className="h-6 w-6 items-center justify-center active:opacity-80 disabled:opacity-40"
                disabled={page >= totalPages}
                onPress={() => onPageChange(page + 1)}
            >
                <ChevronRight color="#ffffff" size={18} />
            </Pressable>
        </View>
    );
}