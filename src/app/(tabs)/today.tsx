import { EmptyState } from '@/components/EmptyState';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Text, View } from '@/tw';

export default function TodayScreen() {
  return (
    <ScreenContainer>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-[36px] font-semibold text-text-primary">Today</Text>
        <EmptyState
          description="Clock in once, then drop quick notes as you work. Your day will reconstruct itself."
          title="Ready when you are."
        />
      </View>
    </ScreenContainer>
  );
}
