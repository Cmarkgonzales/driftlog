export function isDevAuthEnabled(): boolean {
  return process.env.EXPO_PUBLIC_DEV_AUTH === 'true';
}
