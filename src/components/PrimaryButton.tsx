import { Pressable, Text } from '@/tw';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      className={`items-center rounded-card bg-teal px-6 py-4 ${isDisabled ? 'opacity-50' : 'active:opacity-80'}`}
      disabled={isDisabled}
      onPress={onPress}>
      <Text className="text-base font-semibold text-midnight">
        {isLoading ? 'Please wait…' : title}
      </Text>
    </Pressable>
  );
}
