import type { ChatAction } from "@/models/chat";
import { useDanaChat } from "@/hooks/useDanaChat";
import { useRef } from "react";
import { FlatList, View } from "react-native";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatPrompts } from "./ChatPrompts";

type Props = {
    onAction: (action: ChatAction) => void;
};

export function ChatPanel({ onAction }: Props) {
    const listRef = useRef<FlatList>(null);
    const { messages, draft, sending, setDraft, sendText } = useDanaChat();

    return (
        <View className="flex-1 bg-app-shell">
            <FlatList
                ref={listRef}
                className="flex-1"
                data={messages}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="gap-3 px-3 pb-3 pt-3"
                onContentSizeChange={() =>
                    listRef.current?.scrollToEnd({ animated: true })
                }
                renderItem={({ item }) => (
                    <ChatMessageBubble message={item} onAction={onAction} />
                )}
            />
            <ChatPrompts disabled={sending} onPick={(text) => void sendText(text)} />
            <ChatComposer
                value={draft}
                disabled={sending}
                onChangeText={setDraft}
                onSend={() => void sendText(draft)}
            />
        </View>
    );
}