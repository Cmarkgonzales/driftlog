import { EmptyState } from '@/components/EmptyState';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Text, View } from '@/tw';

export default function ExportScreen() {
  return (
    <ScreenContainer>
      <View className="flex-1 px-6 pt-4">
        <Text className="text-[36px] font-semibold text-text-primary">Export</Text>
        <EmptyState
          description="PDF and CSV exports plus shareable day links will be available here."
          title="Share your drift."
        />
      </View>
    </ScreenContainer>
  );
}
