# Project Structure

```

.github/
  workflows/
    publish.yml
    release.yml
apps/
  docs/
    src/
      app/
        app.component.css
        app.component.html
        app.component.spec.ts
        app.component.ts
        app.config.ts
        app.routes.ts
        nx-welcome.component.ts
      index.html
      main.ts
      styles.css
      test-setup.ts
    eslint.config.cjs
    jest.config.ts
    project.json
    tsconfig.app.json
    tsconfig.editor.json
    tsconfig.json
    tsconfig.spec.json
packages/
  button/
    src/
      lib/
        button/
          button.component.css
          button.component.html
          button.component.ts
      index.ts
    CHANGELOG.md
    eslint.config.cjs
    ng-package.json
    package.json
    project.json
    README.md
    tsconfig.json
    tsconfig.lib.json
    tsconfig.lib.prod.json
  tooltip/
    src/
      lib/
        tooltip/
          tooltip.component.css
          tooltip.component.html
          tooltip.component.ts
      index.ts
    CHANGELOG.md
    eslint.config.cjs
    ng-package.json
    package.json
    project.json
    README.md
    tsconfig.json
    tsconfig.lib.json
    tsconfig.lib.prod.json
.editorconfig
.env
.gitignore
.npmrc
.prettierignore
.prettierrc
eslint.config.cjs
jest.config.ts
jest.preset.js
nx.json
package.json
pnpm-lock.yaml
README.md
tsconfig.base.json
```

# Selected Files Content

## .github/workflows/publish.yml

```yml
name: Publish

on:
  push:
    tags:
      - '*@*.*.*'

jobs:
  test:
    name: Publish
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write # needed for provenance data generation
    timeout-minutes: 10
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v4
        with:
          version: 9.15.3

      - name: Install Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        shell: bash

      - name: Print Environment Info
        run: npx nx report
        shell: bash

      - name: Publish packages
        run: npx nx release publish --verbose
        shell: bash
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_ACCESS_TOKEN }}
          NPM_CONFIG_PROVENANCE: true
```

## .github/workflows/release.yml

```yml
# Name of your workflow
name: NX release

# Rules that trigger the workflow
on:
  push:
    branches:
      - main

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the main branch
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GH_TOKEN }}

      - uses: pnpm/action-setup@v4
        with:
          version: 9.15.3

      - name: Install Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        shell: bash

      - name: Build affected libs
        run: npx nx affected run-many --targets=build

      - name: Run nx release
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
        run: |
          git config user.email "ayoubcodez@gmail.com"
          git config user.name "Ayoub Khial2"
          npx nx release --skip-publish --verbose
```

## apps/docs/src/app/app.component.css

```css

```

## apps/docs/src/app/app.component.html

```html
<app-nx-welcome></app-nx-welcome>
<router-outlet></router-outlet>
<div style="display: flex; gap: 90px">
  <lib-button></lib-button>
  <lib-tooltip></lib-tooltip>
</div>
```

## apps/docs/src/app/app.component.spec.ts

```ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NxWelcomeComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome docs');
  });

  it(`should have as title 'docs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('docs');
  });
});
```

## apps/docs/src/app/app.component.ts

```ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ButtonComponent } from '@org-ayb/button';
import { TooltipComponent } from '@org-ayb/tooltip';

@Component({
  imports: [NxWelcomeComponent, RouterModule, ButtonComponent, TooltipComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'docs!!!';
}
```

## apps/docs/src/app/app.config.ts

```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes)],
};
```

## apps/docs/src/app/app.routes.ts

```ts
import { Route } from '@angular/router';

export const appRoutes: Route[] = [];
```

## apps/docs/src/app/nx-welcome.component.ts

```ts
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: `
    <div>
      <h1>👋 Welcome</h1>
      <a href="https://github.com/nrwl/nx" target="_blank" rel="noopener noreferrer"> Nx </a>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
```

## apps/docs/src/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>docs</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

## apps/docs/src/main.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

## apps/docs/src/styles.css

```css
/* You can add global styles to this file, and also import other style files */
```

## apps/docs/src/test-setup.ts

```ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
```

## apps/docs/eslint.config.cjs

```cjs
const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.cjs');

module.exports = [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
```

## apps/docs/jest.config.ts

```ts
export default {
  displayName: 'docs',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/docs',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: ['jest-preset-angular/build/serializers/no-ng-attributes', 'jest-preset-angular/build/serializers/ng-snapshot', 'jest-preset-angular/build/serializers/html-comment'],
};
```

## apps/docs/project.json

```json
{
  "name": "docs",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "projectType": "application",
  "prefix": "app",
  "sourceRoot": "apps/docs/src",
  "tags": [],
  "targets": {
    "build": {
      "executor": "@angular-devkit/build-angular:application",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/docs",
        "index": "apps/docs/src/index.html",
        "browser": "apps/docs/src/main.ts",
        "polyfills": ["zone.js"],
        "tsConfig": "apps/docs/tsconfig.app.json",
        "assets": [
          {
            "glob": "**/*",
            "input": "apps/docs/public"
          }
        ],
        "styles": ["apps/docs/src/styles.css"],
        "scripts": []
      },
      "configurations": {
        "production": {
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "4kb",
              "maximumError": "8kb"
            }
          ],
          "outputHashing": "all"
        },
        "development": {
          "optimization": false,
          "extractLicenses": false,
          "sourceMap": true
        }
      },
      "defaultConfiguration": "production"
    },
    "serve": {
      "executor": "@angular-devkit/build-angular:dev-server",
      "configurations": {
        "production": {
          "buildTarget": "docs:build:production"
        },
        "development": {
          "buildTarget": "docs:build:development"
        }
      },
      "defaultConfiguration": "development"
    },
    "extract-i18n": {
      "executor": "@angular-devkit/build-angular:extract-i18n",
      "options": {
        "buildTarget": "docs:build"
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "apps/docs/jest.config.ts"
      }
    },
    "serve-static": {
      "executor": "@nx/web:file-server",
      "options": {
        "buildTarget": "docs:build",
        "staticFilePath": "dist/apps/docs/browser",
        "spa": true
      }
    }
  }
}
```

## apps/docs/tsconfig.app.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "types": []
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"],
  "exclude": ["jest.config.ts", "src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

## apps/docs/tsconfig.editor.json

```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts"],
  "compilerOptions": {},
  "exclude": ["jest.config.ts", "src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

## apps/docs/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2022",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.editor.json"
    },
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ],
  "extends": "../../tsconfig.base.json",
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

## apps/docs/tsconfig.spec.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "target": "es2016",
    "types": ["jest", "node"]
  },
  "files": ["src/test-setup.ts"],
  "include": ["jest.config.ts", "src/**/*.test.ts", "src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

## packages/button/src/lib/button/button.component.css

```css

```

## packages/button/src/lib/button/button.component.html

```html
<p>Button works!2111s114</p>
```

## packages/button/src/lib/button/button.component.ts

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  title = 'hello !';

  ngOnInit() {
    console.log('Button works!!242323');
    console.log('title', this.title);
  }
}
```

## packages/button/src/index.ts

```ts
export * from './lib/button/button.component';
```

## packages/button/CHANGELOG.md

```md
## 0.9.0 (2025-01-09)

### 🚀 Features

- add-verbose ([ebf7e83](https://github.com/ayoubkhial/nx-releases/commit/ebf7e83))
- use run-many instead of -all ([94380c1](https://github.com/ayoubkhial/nx-releases/commit/94380c1))

### 🩹 Fixes

- add github token to a release step ([a000fc4](https://github.com/ayoubkhial/nx-releases/commit/a000fc4))
- add github user when releasing ([5058ee9](https://github.com/ayoubkhial/nx-releases/commit/5058ee9))
- add github release action ([9dbc622](https://github.com/ayoubkhial/nx-releases/commit/9dbc622))

### ❤️ Thank You

- Ayoub KHIAL

## 0.8.0 (2025-01-09)

### 🚀 Features

- global access public for packages ([52084fd](https://github.com/ayoubkhial/nx-releases/commit/52084fd))

### ❤️ Thank You

- Ayoub KHIAL

## 0.7.2 (2025-01-09)

### 🩹 Fixes

- correct dist folder location ([4d45c17](https://github.com/ayoubkhial/nx-releases/commit/4d45c17))

### ❤️ Thank You

- Ayoub KHIAL

## 0.7.1 (2025-01-09)

### 🩹 Fixes

- global target default for publishing ([50ab963](https://github.com/ayoubkhial/nx-releases/commit/50ab963))

### ❤️ Thank You

- Ayoub KHIAL

## 0.7.0 (2025-01-09)

### 🚀 Features

- publish test ([9859bc2](https://github.com/ayoubkhial/nx-releases/commit/9859bc2))

### ❤️ Thank You

- Ayoub KHIAL

## 0.6.0 (2025-01-09)

### 🚀 Features

- add verbose ([7420e0b](https://github.com/ayoubkhial/nx-releases/commit/7420e0b))

### ❤️ Thank You

- Ayoub KHIAL

## 0.5.2 (2025-01-09)

### 🩹 Fixes

- package.json ([5ecb0a5](https://github.com/ayoubkhial/nx-releases/commit/5ecb0a5))

### ❤️ Thank You

- Ayoub KHIAL

## 0.5.1 (2025-01-09)

### 🩹 Fixes

- add url property to packages ([1600468](https://github.com/ayoubkhial/nx-releases/commit/1600468))

### ❤️ Thank You

- Ayoub KHIAL

## 0.5.0 (2025-01-09)

### 🚀 Features

- mark button and tooltip packages as public ([0332559](https://github.com/ayoubkhial/nx-releases/commit/0332559))

### ❤️ Thank You

- Ayoub KHIAL

## 0.4.0 (2025-01-09)

### 🚀 Features

- btn ([e46c47f](https://github.com/ayoubkhial/nx-releases/commit/e46c47f))

### ❤️ Thank You

- Ayoub KHIAL

## 0.3.0 (2025-01-09)

### 🚀 Features

- both ([25bf1d9](https://github.com/ayoubkhial/nx-releases/commit/25bf1d9))
- btn ([3a48487](https://github.com/ayoubkhial/nx-releases/commit/3a48487))

### 🩹 Fixes

- change tags pattern ([2fa21f0](https://github.com/ayoubkhial/nx-releases/commit/2fa21f0))

### ❤️ Thank You

- Ayoub KHIAL

## 0.2.0 (2025-01-09)

### 🚀 Features

- extend gap ([3565817](https://github.com/ayoubkhial/nx-releases/commit/3565817))

### ❤️ Thank You

- Ayoub KHIAL

## 0.1.0 (2025-01-09)

### 🩹 Fixes

- conventional commits ([2e79e60](https://github.com/ayoubkhial/nx-releases/commit/2e79e60))

### ❤️ Thank You

- Ayoub KHIAL
```

## packages/button/eslint.config.cjs

```cjs
const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.cjs');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lib',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
```

## packages/button/ng-package.json

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/packages/button",
  "lib": {
    "entryFile": "src/index.ts"
  }
}
```

## packages/button/package.json

```json
{
  "name": "@org-ayb/button",
  "version": "0.9.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/ayoubkhial/nx-releases.git"
  },
  "peerDependencies": {
    "@angular/common": "^19.0.0",
    "@angular/core": "^19.0.0"
  },
  "sideEffects": false
}
```

## packages/button/project.json

```json
{
  "name": "button",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/button/src",
  "prefix": "lib",
  "projectType": "library",
  "tags": [],
  "targets": {
    "build": {
      "executor": "@nx/angular:package",
      "outputs": ["{workspaceRoot}/dist/{projectRoot}"],
      "options": {
        "project": "packages/button/ng-package.json"
      },
      "configurations": {
        "production": {
          "tsConfig": "packages/button/tsconfig.lib.prod.json"
        },
        "development": {
          "tsConfig": "packages/button/tsconfig.lib.json"
        }
      },
      "defaultConfiguration": "production"
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    }
  }
}
```

## packages/button/README.md

```md
# button

This library was generated with [Nx](https://nx.dev).
```

## packages/button/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2022",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    }
  ],
  "extends": "../../tsconfig.base.json",
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

## packages/button/tsconfig.lib.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true,
    "types": []
  },
  "exclude": ["src/**/*.spec.ts", "jest.config.ts", "src/**/*.test.ts"],
  "include": ["src/**/*.ts"]
}
```

## packages/button/tsconfig.lib.prod.json

```json
{
  "extends": "./tsconfig.lib.json",
  "compilerOptions": {
    "declarationMap": false
  },
  "angularCompilerOptions": {
    "compilationMode": "partial"
  }
}
```

## packages/tooltip/src/lib/tooltip/tooltip.component.css

```css

```

## packages/tooltip/src/lib/tooltip/tooltip.component.html

```html
<p>Tooltip works!22222</p>
```

## packages/tooltip/src/lib/tooltip/tooltip.component.ts

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent {
  title = 'hello2';
  a = 'b';
}
```

## packages/tooltip/src/index.ts

```ts
export * from './lib/tooltip/tooltip.component';
```

## packages/tooltip/CHANGELOG.md

```md
## 0.7.0 (2025-01-09)

### 🚀 Features

- add-verbose ([ebf7e83](https://github.com/ayoubkhial/nx-releases/commit/ebf7e83))
- use run-many instead of -all ([94380c1](https://github.com/ayoubkhial/nx-releases/commit/94380c1))

### 🩹 Fixes

- add github token to a release step ([a000fc4](https://github.com/ayoubkhial/nx-releases/commit/a000fc4))
- add github user when releasing ([5058ee9](https://github.com/ayoubkhial/nx-releases/commit/5058ee9))
- add github release action ([9dbc622](https://github.com/ayoubkhial/nx-releases/commit/9dbc622))

### ❤️ Thank You

- Ayoub KHIAL

## 0.6.0 (2025-01-09)

### 🚀 Features

- global access public for packages ([52084fd](https://github.com/ayoubkhial/nx-releases/commit/52084fd))

### ❤️ Thank You

- Ayoub KHIAL

## 0.5.2 (2025-01-09)

### 🩹 Fixes

- correct dist folder location ([4d45c17](https://github.com/ayoubkhial/nx-releases/commit/4d45c17))

### ❤️ Thank You

- Ayoub KHIAL

## 0.5.1 (2025-01-09)

### 🩹 Fixes

- global target default for publishing ([50ab963](https://github.com/ayoubkhial/nx-releases/commit/50ab963))

### ❤️ Thank You

- Ayoub KHIAL

## 0.5.0 (2025-01-09)

### 🚀 Features

- publish test ([9859bc2](https://github.com/ayoubkhial/nx-releases/commit/9859bc2))

### ❤️ Thank You

- Ayoub KHIAL

## 0.4.0 (2025-01-09)

### 🚀 Features

- add verbose ([7420e0b](https://github.com/ayoubkhial/nx-releases/commit/7420e0b))

### ❤️ Thank You

- Ayoub KHIAL

## 0.3.2 (2025-01-09)

### 🩹 Fixes

- package.json ([5ecb0a5](https://github.com/ayoubkhial/nx-releases/commit/5ecb0a5))

### ❤️ Thank You

- Ayoub KHIAL

## 0.3.1 (2025-01-09)

### 🩹 Fixes

- add url property to packages ([1600468](https://github.com/ayoubkhial/nx-releases/commit/1600468))

### ❤️ Thank You

- Ayoub KHIAL

## 0.3.0 (2025-01-09)

### 🚀 Features

- mark button and tooltip packages as public ([0332559](https://github.com/ayoubkhial/nx-releases/commit/0332559))

### ❤️ Thank You

- Ayoub KHIAL

## 0.2.0 (2025-01-09)

### 🚀 Features

- both ([25bf1d9](https://github.com/ayoubkhial/nx-releases/commit/25bf1d9))
- tltp ([2f4887b](https://github.com/ayoubkhial/nx-releases/commit/2f4887b))

### 🩹 Fixes

- change tags pattern ([2fa21f0](https://github.com/ayoubkhial/nx-releases/commit/2fa21f0))

### ❤️ Thank You

- Ayoub KHIAL

## 0.1.0 (2025-01-09)

### 🩹 Fixes

- conventional commits ([2e79e60](https://github.com/ayoubkhial/nx-releases/commit/2e79e60))

### ❤️ Thank You

- Ayoub KHIAL
```

## packages/tooltip/eslint.config.cjs

```cjs
const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.cjs');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lib',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
```

## packages/tooltip/ng-package.json

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/packages/tooltip",
  "lib": {
    "entryFile": "src/index.ts"
  }
}
```

## packages/tooltip/package.json

```json
{
  "name": "@org-ayb/tooltip",
  "version": "0.7.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/ayoubkhial/nx-releases.git"
  },
  "peerDependencies": {
    "@angular/common": "^19.0.0",
    "@angular/core": "^19.0.0"
  },
  "sideEffects": false
}
```

## packages/tooltip/project.json

```json
{
  "name": "tooltip",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/tooltip/src",
  "prefix": "lib",
  "projectType": "library",
  "tags": [],
  "targets": {
    "build": {
      "executor": "@nx/angular:package",
      "outputs": ["{workspaceRoot}/dist/{projectRoot}"],
      "options": {
        "project": "packages/tooltip/ng-package.json"
      },
      "configurations": {
        "production": {
          "tsConfig": "packages/tooltip/tsconfig.lib.prod.json"
        },
        "development": {
          "tsConfig": "packages/tooltip/tsconfig.lib.json"
        }
      },
      "defaultConfiguration": "production"
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    }
  }
}
```

## packages/tooltip/README.md

```md
# tooltip

This library was generated with [Nx](https://nx.dev).
```

## packages/tooltip/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2022",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    }
  ],
  "extends": "../../tsconfig.base.json",
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

## packages/tooltip/tsconfig.lib.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true,
    "types": []
  },
  "exclude": ["src/**/*.spec.ts", "jest.config.ts", "src/**/*.test.ts"],
  "include": ["src/**/*.ts"]
}
```

## packages/tooltip/tsconfig.lib.prod.json

```json
{
  "extends": "./tsconfig.lib.json",
  "compilerOptions": {
    "declarationMap": false
  },
  "angularCompilerOptions": {
    "compilationMode": "partial"
  }
}
```

## nx.json

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": ["default", "!{projectRoot}/.eslintrc.json", "!{projectRoot}/eslint.config.cjs", "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)", "!{projectRoot}/tsconfig.spec.json", "!{projectRoot}/jest.config.[jt]s", "!{projectRoot}/src/test-setup.[jt]s", "!{projectRoot}/test-setup.[jt]s"],
    "sharedGlobals": []
  },
  "targetDefaults": {
    "@angular-devkit/build-angular:application": {
      "cache": true,
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "@nx/eslint:lint": {
      "cache": true,
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json", "{workspaceRoot}/.eslintignore", "{workspaceRoot}/eslint.config.cjs"]
    },
    "@nx/jest:jest": {
      "cache": true,
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
      "options": {
        "passWithNoTests": true
      },
      "configurations": {
        "ci": {
          "ci": true,
          "codeCoverage": true
        }
      }
    },
    "@nx/angular:package": {
      "cache": true,
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "nx-release-publish": {
      "dependsOn": ["build"],
      "options": {
        "packageRoot": "dist/packages/{projectName}",
        "access": "public"
      }
    }
  },
  "generators": {
    "@nx/angular:application": {
      "e2eTestRunner": "none",
      "linter": "eslint",
      "style": "css",
      "unitTestRunner": "jest"
    },
    "@nx/angular:library": {
      "linter": "eslint",
      "unitTestRunner": "none"
    },
    "@nx/angular:component": {
      "style": "css"
    }
  },
  "release": {
    "projects": ["packages/*"],
    "projectsRelationship": "independent",
    "changelog": {
      "projectChangelogs": {
        "createRelease": "github"
      }
    },
    "version": {
      "preVersionCommand": "npx nx run-many -t build",
      "conventionalCommits": true
    }
  }
}
```

## package.json

```json
{
  "name": "@nx-releases/source",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {},
  "private": true,
  "dependencies": {
    "@angular/animations": "~19.0.0",
    "@angular/common": "~19.0.0",
    "@angular/compiler": "~19.0.0",
    "@angular/core": "~19.0.0",
    "@angular/forms": "~19.0.0",
    "@angular/platform-browser": "~19.0.0",
    "@angular/platform-browser-dynamic": "~19.0.0",
    "@angular/router": "~19.0.0",
    "rxjs": "~7.8.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~19.0.0",
    "@angular-devkit/core": "~19.0.0",
    "@angular-devkit/schematics": "~19.0.0",
    "@angular/cli": "~19.0.0",
    "@angular/compiler-cli": "~19.0.0",
    "@angular/language-service": "~19.0.0",
    "@eslint/js": "^9.8.0",
    "@nx/angular": "20.3.1",
    "@nx/eslint": "20.3.1",
    "@nx/eslint-plugin": "20.3.1",
    "@nx/jest": "20.3.1",
    "@nx/js": "20.3.1",
    "@nx/web": "20.3.1",
    "@nx/workspace": "20.3.1",
    "@schematics/angular": "~19.0.0",
    "@swc-node/register": "~1.9.1",
    "@swc/core": "~1.5.7",
    "@swc/helpers": "~0.5.11",
    "@types/jest": "^29.5.12",
    "@types/node": "18.16.9",
    "@typescript-eslint/utils": "^8.13.0",
    "angular-eslint": "^19.0.2",
    "autoprefixer": "^10.4.0",
    "eslint": "^9.8.0",
    "eslint-config-prettier": "^9.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-preset-angular": "~14.4.0",
    "jsonc-eslint-parser": "^2.1.0",
    "ng-packagr": "~19.0.0",
    "nx": "20.3.1",
    "postcss": "^8.4.5",
    "postcss-url": "~10.1.3",
    "prettier": "^2.6.2",
    "ts-jest": "^29.1.0",
    "ts-node": "10.9.1",
    "tslib": "^2.3.0",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.13.0"
  },
  "packageManager": "pnpm@9.15.3"
}
```

## tsconfig.base.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@org-ayb/button": ["packages/button/src/index.ts"],
      "@org-ayb/tooltip": ["packages/tooltip/src/index.ts"]
    }
  },
  "exclude": ["node_modules", "tmp"]
}
```
