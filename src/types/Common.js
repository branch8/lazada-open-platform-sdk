/**
 * @flow
 */
export type KeyValueDictionary = {
  [key: string]: any, // string | number,
}

export type AccessToken = {
  access_token: string,
}

export type Venture =
  | 'SINGAPORE'
  | 'THAILAND'
  | 'MALAYSIA'
  | 'VIETNAM'
  | 'PHILIPPINES'
  | 'INDONESIA'
