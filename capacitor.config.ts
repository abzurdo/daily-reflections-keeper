
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6d687b58b531403ba3c77e5d3be1bed6',
  appName: 'daily-reflections-keeper',
  webDir: 'dist',
  server: {
    url: "https://6d687b58-b531-403b-a3c7-7e5d3be1bed6.lovableproject.com?forceHideBadge=true",
    cleartext: true,
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  }
};

export default config;
