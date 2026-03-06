# Installation Guide

This document provides detailed instructions for installing, compiling, and running the Laundry App.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Installation Steps](#installation-steps)
- [Environment Setup](#environment-setup)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before installing the Laundry App, ensure you have the following installed on your system:

### Required Software
- **Node.js**: Version 16.x or higher (recommended: 18.x or 20.x)
- **npm**: Version 7.x or higher (comes with Node.js)
- **Git**: For cloning the repository

### Verify Installation
Check your current versions:

```bash
node --version
npm --version
git --version
```

### Operating System Support
- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 20.04+, Debian, Fedora, etc.)

---

## Dependencies

The Laundry App uses the following dependencies:

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | Core React library for building UI |
| `react-dom` | ^18.3.1 | React DOM rendering |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `@testing-library/jest-dom` | ^6.0.0 | Custom Jest matchers for DOM testing |
| `@testing-library/react` | ^14.0.0 | React component testing utilities |
| `@testing-library/user-event` | ^14.0.0 | User interaction simulation for tests |
| `@types/node` | ^25.3.3 | TypeScript definitions for Node.js |
| `@types/react` | ^18.3.28 | TypeScript definitions for React |
| `@types/react-dom` | ^18.3.7 | TypeScript definitions for React DOM |
| `@vitejs/plugin-react` | ^4.0.0 | Vite plugin for React support |
| `jsdom` | ^22.0.0 | DOM implementation for testing |
| `typescript` | ^5.9.3 | TypeScript compiler |
| `vite` | ^5.1.0 | Fast build tool and dev server |
| `vitest` | ^1.0.0 | Testing framework |

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Baller2003jg/laundry_app.git
cd laundry_app
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn (alternative):
```bash
yarn install
```

Using pnpm (alternative):
```bash
pnpm install
```

**Note**: The installation may take 1-3 minutes depending on your internet connection.

### 3. Verify Installation

Check that all packages were installed correctly:
```bash
npm list --depth=0
```

---

## Environment Setup

### Development Environment

#### 1. Start Development Server

```bash
npm run dev
```

The development server will start on **http://localhost:5173** (default Vite port).

**Expected Output**:
```
VITE v5.1.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 2. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

#### 3. Hot Module Replacement (HMR)

The dev server includes Hot Module Replacement. Changes to your code will be reflected instantly in the browser without a full page reload.

### Configuration Files

The project includes the following configuration files:

#### `vite.config.ts`
Vite build configuration - handles compilation and dev server settings.

#### `tsconfig.json`
TypeScript compiler configuration - defines type checking and compilation options.

#### `vitest.config.ts`
Vitest testing configuration - defines test environment and settings.

### Environment Variables

Currently, the app doesn't require environment variables. If you need to add them in the future:

1. Create a `.env` file in the root directory
2. Add variables with `VITE_` prefix:
   ```
   VITE_API_URL=https://your-api-url.com
   VITE_APP_TITLE=Laundry App
   ```
3. Access in code via `import.meta.env.VITE_API_URL`

---

## Building for Production

### 1. Create Production Build

```bash
npm run build
```

This command:
- Compiles TypeScript to JavaScript
- Bundles and optimizes all assets
- Minifies code for production
- Outputs to the `dist/` folder

**Expected Output**:
```
vite v5.1.0 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB
dist/assets/index-XXXXX.css      XX.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB
✓ built in XXXms
```

### 2. Preview Production Build

Test the production build locally:

```bash
npm run preview
```

This starts a local static server serving the `dist/` folder at **http://localhost:4173**.

### 3. Deploy Production Build

The `dist/` folder contains all production-ready files. You can deploy this folder to:

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload the `dist/` folder to your bucket
- **Any static hosting service**

**Deployment Example (Netlify)**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

---

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

---

## Troubleshooting

### Common Issues

#### Issue: "Command not found: npm"
**Solution**: Install Node.js from https://nodejs.org/

#### Issue: Port 5173 already in use
**Solution**: 
- Kill the process using port 5173
- Or specify a different port:
  ```bash
  npm run dev -- --port 3000
  ```

#### Issue: Module not found errors
**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: TypeScript errors
**Solution**:
```bash
# Verify TypeScript installation
npm list typescript

# Check tsconfig.json for errors
npx tsc --noEmit
```

#### Issue: Slow development server
**Solution**:
- Clear Vite cache:
  ```bash
  rm -rf node_modules/.vite
  npm run dev
  ```

#### Issue: Build fails
**Solution**:
- Check for TypeScript errors: `npx tsc --noEmit`
- Clear cache and rebuild:
  ```bash
  rm -rf dist node_modules/.vite
  npm run build
  ```

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/Baller2003jg/laundry_app/issues)
2. Review the [Vite documentation](https://vitejs.dev/)
3. Review the [React documentation](https://react.dev/)
4. Create a new issue with:
   - Your Node.js version
   - Your npm version
   - Error messages
   - Steps to reproduce

---

## Development Workflow

### Recommended Workflow

1. **Start development server**: `npm run dev`
2. **Make changes** to source files in `src/`
3. **View changes** automatically in browser (HMR)
4. **Run tests**: `npm test`
5. **Build for production**: `npm run build`
6. **Preview build**: `npm run preview`
7. **Deploy** the `dist/` folder

### File Structure

```
laundry_app/
├── src/                    # Source files
│   ├── App.tsx            # Main application component
│   ├── Login.tsx          # Login component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles
│   └── components/        # Reusable components
│       └── MachineSelector.tsx
├── docs/                  # Documentation
│   ├── USER_GUIDE.md     # User documentation
│   └── INSTALL.md        # This file
├── dist/                  # Production build (generated)
├── node_modules/          # Dependencies (generated)
├── index.html            # HTML template
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── vitest.config.ts      # Vitest configuration
```

---

## System Requirements

### Minimum Requirements
- **CPU**: 1 GHz processor
- **RAM**: 2 GB
- **Disk Space**: 500 MB
- **Browser**: Any modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Recommended Requirements
- **CPU**: 2 GHz multi-core processor
- **RAM**: 4 GB or more
- **Disk Space**: 1 GB
- **Browser**: Latest version of Chrome, Firefox, Safari, or Edge
- **Internet**: Required for initial installation and live updates

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Documentation](https://vitest.dev/)
- [User Guide](./USER_GUIDE.md) - How to use the app

---

*Last Updated: March 6, 2026*
