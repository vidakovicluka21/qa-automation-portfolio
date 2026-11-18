import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const environment = process.env.TEST_ENV ?? 'dev';

if (!['dev', 'staging'].includes(environment)) {
  throw new Error(`Unsupported environment: ${environment}`);
}

dotenv.config({
  path: `.env.${environment}`,
  override: true,
});

const apiBaseURL = process.env.API_BASE_URL;

if (!apiBaseURL) {
  throw new Error('Missing required environment variable: API_BASE_URL');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: apiBaseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
