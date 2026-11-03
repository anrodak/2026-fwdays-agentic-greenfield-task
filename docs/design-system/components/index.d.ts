import type * as React from 'react';

export type GlyphName = 'sun' | 'moon' | 'partly' | 'partly-night' | 'cloud' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm' | 'wind' | 'droplet' | 'sunrise' | 'sunset' | 'search' | 'locate' | 'pin' | 'x' | 'alert' | 'columns' | 'map-pin';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'sm' | 'icon';
  icon?: GlyphName;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface ComfortBadgeProps { value: number; show?: 'number' | 'word' | 'both'; size?: 'md' | 'lg' }
export declare function ComfortBadge(props: ComfortBadgeProps): React.ReactElement;

export interface DayCardProps {
  weekday?: string; today?: boolean; date: string; longLabel: string;
  code: number; hi: number; lo: number; precip: number; wind: number; comfort: number; weekend?: boolean;
}
export declare function DayCard(props: DayCardProps): React.ReactElement;

export interface WeekendDay { weekday: string; hi: number; lo: number; comfort: number }
export interface WeekendSummaryProps { score?: number; range?: string; city?: string; rationale?: string; days?: WeekendDay[]; unavailable?: boolean }
export declare function WeekendSummary(props: WeekendSummaryProps): React.ReactElement;

export interface HourlyPoint { hour: number; day: string; temp: number }
export interface HourlyChartProps { points: HourlyPoint[]; width?: number; height?: number; sunrise?: string; sunset?: string }
export declare function HourlyChart(props: HourlyChartProps): React.ReactElement;

export interface CitySuggestion { name: string; admin?: string; country: string; flag?: string }
export interface CitySearchProps { id?: string; query?: string; suggestions?: CitySuggestion[]; active?: number; empty?: boolean }
export declare function CitySearch(props: CitySearchProps): React.ReactElement;

export interface PinnedCity { id: string; name: string }
export interface CityChipsProps { cities: PinnedCity[]; activeId?: string; max?: number; comparing?: boolean; pinName?: string }
export declare function CityChips(props: CityChipsProps): React.ReactElement;

export interface CompareDay { hi: number; lo: number; precip: number; comfort: number }
export interface CompareCity { id: string; name: string; sat: CompareDay; sun: CompareDay }
export interface CompareTableProps { cities: CompareCity[]; activeId?: string; satLabel?: string; sunLabel?: string }
export declare function CompareTable(props: CompareTableProps): React.ReactElement;

export interface MapFrameProps { name?: string; coords?: [number, number]; loading?: boolean }
export declare function MapFrame(props: MapFrameProps): React.ReactElement;

export interface SkyBackdropProps { mode?: 'day' | 'night'; condition?: 'clear' | 'cloud' | 'rain' | 'snow'; seed?: number; children?: React.ReactNode }
export declare function SkyBackdrop(props: SkyBackdropProps): React.ReactElement;

export interface WeatherIconProps { name: GlyphName; size?: number; label?: string; strokeWidth?: number; className?: string }
export declare function WeatherIcon(props: WeatherIconProps): React.ReactElement;

export interface StatusMessageProps { title: string; icon?: GlyphName; actionLabel?: string; children?: React.ReactNode }
export declare function StatusMessage(props: StatusMessageProps): React.ReactElement;

export interface TopBarProps { time: string; dateTime?: string; clockLabel?: string }
export declare function TopBar(props: TopBarProps): React.ReactElement;

export interface SiteFooterProps { joke?: string }
export declare function SiteFooter(props: SiteFooterProps): React.ReactElement;

/** "+11°", "−3°", "0°" */
export declare function formatTemp(celsius: number): string;
/** "4 м/с" */
export declare function formatWind(metresPerSecond: number): string;
/** "40%" */
export declare function formatPrecip(percent: number): string;
/** "49,84° пн. ш., 24,03° сх. д." */
export declare function formatCoords(lat: number, lon: number): string;
export declare function comfortTier(score: number): 'good' | 'fair' | 'poor';
export declare function weatherFromCode(code: number, night?: boolean): { icon: GlyphName; label: string };

declare global {
  interface Window {
    Wx: {
      Button: typeof Button; ComfortBadge: typeof ComfortBadge; DayCard: typeof DayCard; WeekendSummary: typeof WeekendSummary;
      HourlyChart: typeof HourlyChart; CitySearch: typeof CitySearch; CityChips: typeof CityChips; CompareTable: typeof CompareTable;
      MapFrame: typeof MapFrame; SkyBackdrop: typeof SkyBackdrop; WeatherIcon: typeof WeatherIcon; StatusMessage: typeof StatusMessage;
      TopBar: typeof TopBar; SiteFooter: typeof SiteFooter;
      formatTemp: typeof formatTemp; formatWind: typeof formatWind; formatPrecip: typeof formatPrecip; formatCoords: typeof formatCoords;
      comfortTier: typeof comfortTier; weatherFromCode: typeof weatherFromCode; GLYPH_NAMES: GlyphName[];
    };
  }
}
