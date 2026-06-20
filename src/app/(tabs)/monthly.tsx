import { EmptyState } from '@/components/EmptyState';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Text, View } from '@/tw';

export default function MonthlyScreen() {
  return (
    <ScreenContainer>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-[36px] font-semibold text-text-primary">Monthly</Text>
        <EmptyState
          description="Mood heatmaps, streaks, and tag breakdowns will live here."
          title="See the shape of your month."
        />
      </View>
    </ScreenContainer>
  );
}
