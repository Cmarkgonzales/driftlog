import type { ReactNode } from 'react';

import { Text, View } from '@/tw';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-6">
      <Text className="text-center font-serif text-[22px] italic text-text-primary">{title}</Text>
      {description ? (
        <Text className="text-center text-base text-text-secondary">{description}</Text>
      ) : null}
      {action}
    </View>
  );
}
