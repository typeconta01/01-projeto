# Higor

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jucyel-sousas-projects/v0-higor)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/GpXf6LEOiwk)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/jucyel-sousas-projects/v0-higor](https://vercel.com/jucyel-sousas-projects/v0-higor)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/GpXf6LEOiwk](https://v0.dev/chat/projects/GpXf6LEOiwk)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Local Development

1. Install dependencies using **pnpm** or **npm**:

   ```bash
   pnpm install
   # or
   npm install
   ```

2. Create a `.env.local` file with the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
   PIXUP_CLIENT_ID=<your-pixup-client-id>
   PIXUP_CLIENT_SECRET=<your-pixup-client-secret>
   PIXUP_WEBHOOK_URL=<public-webhook-url>
   ```

3. Run the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

The app will be available at `http://localhost:3000`.
