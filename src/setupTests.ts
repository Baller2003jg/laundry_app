import { expect } from 'vitest'
// import all matchers (works across CJS/ESM builds)
import * as matchers from '@testing-library/jest-dom/matchers'

// Register jest-dom matchers with Vitest's expect
expect.extend(matchers as any)
