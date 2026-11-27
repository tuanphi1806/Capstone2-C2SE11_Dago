import { translate } from "@/i18n/translations";
import useLocaleStore from "@/store/locale.store";
import { formatAmount } from "@/utils/formatCurrency";

export function formatVnd(amount: number) {
    const locale = useLocaleStore.getState().locale;
    return translate(locale, "common.currencyVnd", {
        amount: formatAmount(amount, locale),
    });
}