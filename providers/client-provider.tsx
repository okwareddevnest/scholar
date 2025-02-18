'use client';

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import { AuthProvider } from "./auth-provider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <KindeProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </KindeProvider>
  );
} 