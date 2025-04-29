// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'book.fill': 'book',
  'chart.bar.fill': 'bar-chart',
  'person.fill': 'person',
  'folder.fill': 'folder',
  'square.grid.2x2.fill': 'apps',
  'arrow.right': 'arrow-forward',
  'arrow.clockwise': 'refresh',
  'lock.fill': 'lock',
  'envelope.fill': 'email',
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'rectangle.portrait.and.arrow.right': 'logout',
  'clock.fill': 'access-time',
  'flame.fill': 'whatshot',
  'star.fill': 'star',
  'keyboard': 'keyboard',
  'checkmark.seal.fill': 'verified',
  'atom': 'science',
  'circle.fill': 'circle',
  'play.fill': 'play-arrow',
  'arrow.counterclockwise': 'restore',
  'cube.fill': 'view-in-ar',
  'checkmark': 'check',
  'camera.fill': 'camera',
  'bell.fill': 'notifications',
  'moon.fill': 'nightlight-round',
  'globe': 'language',
  'questionmark.circle.fill': 'help',
  'pencil': 'edit',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
