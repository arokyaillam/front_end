// lib/eden-client.ts
import { treaty } from '@elysiajs/eden';
import type { App } from '../../../backend/src/index'; // Backend type import

/**
 * Eden Treaty Client Setup
 * Type-safe API calls with full TypeScript support
 */
export const api = treaty<App>('http://localhost:3001');

/**
 * Usage:
 * await api.auth.signup.post({ email: '...', password: '...' })
 * await api.auth.login.post({ email: '...', password: '...' })
 * await api.auth.me.get({ headers: { authorization: 'Bearer ...' } })
 */

export default api;