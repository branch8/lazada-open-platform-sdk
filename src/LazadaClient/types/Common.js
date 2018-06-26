/**
 * @flow
 */

export type APIAction = (
  appKey: string, // require for signing
  appSecret: string, // require for signing
  baseURL: string, // location specific gateway
  accessToken: ?string, // for all actions that require authorization
  payload: {}, // parameters
) => Promise<*>
