import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';
//
import useLocalStorage from 'src/hooks/useLocalStorage';
import localStorageAvailable from 'src/utils/localStorageAvailable';

import { defaultSettings } from '../config-setting';
import { defaultPreset, getPresets, presetsOption } from '../presets';

import {
  ThemeModeValue,
  PresetsColorProps,
  ThemeDirectionValue,
  SettingsContextProps,
  ThemeColorPresetsValue,
} from '../types/types';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: () => {},
  // Direction
  onToggleDirection: () => {},
  // Color
  onChangeColorPresets: () => {},
  presetsColor: defaultPreset,
  presetsOption: [],
  onChangeDirectionByLang: () => {},
  onChangeDirection: () => {},
  // Reset
  onResetSetting: () => {},
  // Open
  open: false,
  onToggle: () => {},
  onOpen: () => {},
  onClose: () => {},
  // Not default
  notDefault: false,
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);

  const storageAvailable = localStorageAvailable();

  const langStorage = storageAvailable ? localStorage.getItem('i18nextLng') : '';

  const [open, setOpen] = useState(false);

  const [themeMode, setThemeMode] = useState(defaultSettings.themeMode);
  const [themeDirection, setThemeDirection] = useState(defaultSettings.themeDirection);
  const [themeColorPresets, setThemeColorPresets] = useState(defaultSettings.themeColorPresets);

  useEffect(() => {
    const mode = getCookie('themeMode') || defaultSettings.themeMode;
    const direction = getCookie('themeDirection') || defaultSettings.themeDirection;
    const colorPresets = getCookie('themeColorPresets') || defaultSettings.themeColorPresets;

    setThemeMode(mode as ThemeModeValue);
    setThemeDirection(direction as ThemeDirectionValue);
    setThemeColorPresets(colorPresets as ThemeColorPresetsValue);
  }, []);
  const isArabic = langStorage === 'ar';
  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      const themeDirectionLangAux = lang === 'ar' ? 'rtl' : 'ltr';
      setSettings({ ...settings, themeDirectionLangAux });
    },
    [setSettings, settings]
  );

  const onChangeDirection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const themeDirectionAux = event.target.value;
      setSettings({ ...settings, themeDirectionAux });
    },
    [setSettings, settings]
  );

  // Mode
  const onToggleMode = useCallback(() => {
    const value = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(value);
    setCookie('themeMode', value);
  }, [themeMode]);

  // Direction
  const onToggleDirection = useCallback(() => {
    const value = themeDirection === 'rtl' ? 'ltr' : 'rtl';
    setThemeDirection(value);
    setCookie('themeDirection', value);
  }, [themeDirection]);

  // Color
  const onChangeColorPresets = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ThemeColorPresetsValue;
    setThemeColorPresets(value);
    setCookie('themeColorPresets', value);
  }, []);

  // Reset
  const onResetSetting = useCallback(() => {
    setThemeMode(defaultSettings.themeMode);
    setThemeDirection(defaultSettings.themeDirection);
    setThemeColorPresets(defaultSettings.themeColorPresets);
    removeCookie('themeMode');
    removeCookie('themeDirection');
    removeCookie('themeColorPresets');
  }, []);

  const onToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets;

  const memoizedValue = useMemo(
    () => ({
      // Mode
      themeMode,
      onToggleMode,
      // Direction
      themeDirection,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,

      // Color
      themeColorPresets,
      onChangeColorPresets,
      presetsOption,
      presetsColor: getPresets(themeColorPresets) as PresetsColorProps,
      // Reset
      onResetSetting,
      // Open
      open,
      onToggle,
      onOpen,
      onClose,
      // Not default
      notDefault,
    }),
    [
      // Mode
      themeMode,
      onToggleMode,
      // Color
      themeColorPresets,
      onChangeColorPresets,
      // Direction
      themeDirection,
      onToggleDirection,
      onChangeDirection,
      onChangeDirectionByLang,
      // Reset
      onResetSetting,
      // Open
      open,
      onToggle,
      onOpen,
      onClose,
      // Not default
      notDefault,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

// ----------------------------------------------------------------------

function getCookie(name: string) {
  if (typeof document === 'undefined') {
    throw new Error(
      'getCookie() is not supported on the server. Fallback to a different value when rendering on the server.'
    );
  }

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(';').shift();
  }

  return undefined;
}

function setCookie(name: string, value: string, exdays = 3) {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=;path=/;max-age=0`;
}
