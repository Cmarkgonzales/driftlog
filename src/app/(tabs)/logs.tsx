import { EmptyState } from '@/components/EmptyState';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Text, View } from '@/tw';

export default function LogsScreen() {
  return (
    <ScreenContainer>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-[36px] font-semibold text-text-primary">Logs</Text>
        <EmptyState
          description="After you clock out, AI-written daily logs will appear here."
          title="Your reconstructed workdays."
        />
      </View>
    </ScreenContainer>
  );
}
