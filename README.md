# Cafe Fresco Dashboard

A modern admin dashboard for Cafe Fresco, built with React, Vite, Material UI, and React Router.

This panel is designed for managing daily restaurant operations such as products, categories, orders, users, inventory, suppliers, departments, employees, and more.

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Prerequisites
- Beginner Setup Guide
- Environment Variables
- Available Scripts
- Build and Deployment
- Troubleshooting
- Developer

## Overview

Cafe Fresco Dashboard is a role-aware admin interface that connects to a backend API and helps administrators manage cafe data from one place.

It includes secure login, protected admin routes, dashboard analytics cards/charts, and CRUD pages for multiple business modules.

## Features

- Secure admin authentication flow
	- Login page
	- Forgot password flow
	- Reset password flow
	- Cookie-based admin token handling

- Protected routing
	- Admin pages are protected through route guards
	- Unauthorized users are redirected to login
	- Access denied page for restricted roles

- Dashboard analytics
	- Earnings and order summary cards
	- Monthly and yearly order stats
	- Growth chart and popular section

- Business management modules
	- Product management (add, list, edit)
	- Category management (add, list, edit)
	- Order listing
	- Permission listing
	- User listing
	- Discount code module
	- Department and distributor modules
	- Employee management (add, list, edit)
	- Supplier management (add, list, edit)
	- Inventory module

- UI and user experience
	- Responsive layout with sidebar and header
	- Theme customization support
	- Reusable UI components and cards
	- Smooth scrolling and lazy-loaded routes

- Deployment-ready setup
	- Vite build pipeline
	- Vercel rewrite config for SPA routing

## Tech Stack

- Core
	- React 18
	- Vite 6
	- React Router 7

- UI and styling
	- Material UI 6
	- Emotion
	- SCSS
	- Fontsource (Roboto, Inter, Poppins)
	- Tabler Icons

- Data and utilities
	- SWR
	- js-cookie
	- lodash-es
	- yup

- Charts and motion
	- ApexCharts + react-apexcharts
	- framer-motion

- Quality and tooling
	- ESLint 9
	- Yarn 4

## Project Structure

Main folders inside src:

- api: local API/state helpers
- assets: images and SCSS styles
- contexts: app configuration context
- hooks: reusable hooks
- layout: main/minimal layout and navigation system
- menu-items: sidebar menu definitions
- routes: route configuration and guards
- themes: MUI theme, palette, typography, overrides
- ui-component: reusable UI blocks and cards
- views: all pages (dashboard, auth, product, order, etc.)

## Prerequisites

Install these before running the project:

- Node.js 18 or newer
- Corepack enabled (recommended for Yarn 4)

Optional but recommended:

- Git
- VS Code

## Beginner Setup Guide

Follow these steps from zero:

1) Clone the repository

git clone <your-repository-url>

2) Open project folder

cd cafeFresco-dashboard

3) Enable Corepack (one-time on your machine)

corepack enable

4) Install dependencies

yarn install

5) Create environment file

Create a .env file in project root and add the variables shown in the Environment Variables section below.

6) Start development server

yarn start

7) Open in browser

By default Vite runs on port 5173:

http://localhost:5173

## Environment Variables

Create a file named .env in the project root:

VITE_BASE_URL=http://localhost:5000
VITE_APP_BASE_NAME=/
VITE_APP_VERSION=4.0.0

Variable meaning:

- VITE_BASE_URL: Backend API base URL
- VITE_APP_BASE_NAME: Router basename and Vite base path
- VITE_APP_VERSION: App version shown in sidebar chip

Note:

- If you deploy under a subpath, update VITE_APP_BASE_NAME accordingly (example: /dashboard/).

## Available Scripts

- yarn start
	- Runs the app in development mode

- yarn build
	- Builds optimized production files

- yarn preview
	- Serves the production build locally for checking

- yarn lint
	- Runs ESLint checks in src

- yarn lint:fix
	- Auto-fixes lint issues where possible

- yarn prettier
	- Formats source files with Prettier

## Build and Deployment

Production build:

yarn build

Preview production build locally:

yarn preview

Vercel notes:

- vercel.json already includes SPA rewrite to index.html
- Ensure environment variables are configured in your Vercel project settings

## Troubleshooting

- Blank page or route errors after deploy
	- Check VITE_APP_BASE_NAME and hosting base path

- API calls failing
	- Verify VITE_BASE_URL points to your backend
	- Make sure backend CORS and routes are configured

- Login not persisting
	- Check browser cookie settings
	- Ensure backend is returning token correctly

- Dependency issues
	- Remove node_modules and reinstall with yarn install

## Developer

Developed by Muhammad Ismaeel.
