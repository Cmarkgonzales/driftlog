import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { Colors } from '@/constants/theme';

const tabs = [
  { name: 'today', label: 'Today' },
  { name: 'logs', label: 'Logs' },
  { name: 'monthly', label: 'Monthly' },
  { name: 'export', label: 'Export' },
  { name: 'settings', label: 'Settings' },
] as const;

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={Colors.surface}
      indicatorColor={Colors.elevated}
      labelStyle={{ selected: { color: Colors.textPrimary } }}>
      {tabs.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
