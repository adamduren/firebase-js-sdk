import { Observer, Unsubscribe } from "@firebase/util";
import { FirebaseApp, FirebaseNamespace } from "@firebase/app-types";

interface StorageSettableMetadata {
  cacheControl?: string | null;
  contentDisposition?: string | null;
  contentEncoding?: string | null;
  contentLanguage?: string | null;
  contentType?: string | null;
  customMetadata?: {
    [/* warning: coerced from ? */ key: string]: string;
  } | null;
}

export interface FirebaseStorage {
  app: FirebaseApp;
  maxOperationRetryTime: number;
  maxUploadRetryTime: number;
  ref(path?: string): StorageReference;
  refFromURL(url: string): StorageReference;
  setMaxOperationRetryTime(time: number): any;
  setMaxUploadRetryTime(time: number): any;
}

export interface StorageFullMetadata extends StorageUploadMetadata {
  bucket: string;
  downloadURLs: string[];
  fullPath: string;
  generation: string;
  metageneration: string;
  name: string;
  size: number;
  timeCreated: string;
  updated: string;
}

export interface StorageReference {
  bucket: string;
  child(path: string): StorageReference;
  delete(): Promise<any>;
  fullPath: string;
  getDownloadURL(): Promise<any>;
  getMetadata(): Promise<any>;
  name: string;
  parent: StorageReference | null;
  put(
    data: any | any | any,
    metadata?: StorageUploadMetadata
  ): StorageUploadTask;
  putString(
    data: string,
    format?: StringFormat,
    metadata?: StorageUploadMetadata
  ): StorageUploadTask;
  root: StorageReference;
  storage: FirebaseStorage;
  toString(): string;
  updateMetadata(metadata: StorageSettableMetadata): Promise<any>;
}

export interface StorageSettableMetadata {
  cacheControl?: string | null;
  contentDisposition?: string | null;
  contentEncoding?: string | null;
  contentLanguage?: string | null;
  contentType?: string | null;
  customMetadata?: {
    [/* warning: coerced from ? */ key: string]: string;
  } | null;
}

type StringFormat = string;
declare var StringFormat: {
  BASE64: StringFormat;
  BASE64URL: StringFormat;
  DATA_URL: StringFormat;
  RAW: StringFormat;
};

type StorageTaskEvent = string;
declare var StorageTaskEvent: {
  STATE_CHANGED: StorageTaskEvent;
};

type StorageTaskState = string;
declare var StorageTaskState: {
  CANCELED: StorageTaskState;
  ERROR: StorageTaskState;
  PAUSED: StorageTaskState;
  RUNNING: StorageTaskState;
  SUCCESS: StorageTaskState;
};

export interface StorageUploadMetadata extends StorageSettableMetadata {
  md5Hash?: string | null;
}

export interface StorageUploadTask {
  cancel(): boolean;
  catch(onRejected: (a: Error) => any): Promise<any>;
  on(
    event: StorageTaskEvent,
    nextOrObserver?:
      | Observer<any, any>
      | null
      | ((a: Object) => any),
    error?: ((a: Error) => any) | null,
    complete?: (Unsubscribe) | null
  ): Function;
  pause(): boolean;
  resume(): boolean;
  snapshot: StorageUploadTaskSnapshot;
  then(
    onFulfilled?: ((a: StorageUploadTaskSnapshot) => any) | null,
    onRejected?: ((a: Error) => any) | null
  ): Promise<any>;
}

export interface StorageUploadTaskSnapshot {
  bytesTransferred: number;
  downloadURL: string | null;
  metadata: StorageFullMetadata;
  ref: StorageReference;
  state: StorageTaskState;
  task: StorageUploadTask;
  totalBytes: number;
}

declare module '@firebase/app-types' {
  interface FirebaseNamespace {
    storage?(app?: FirebaseApp): FirebaseStorage;
  }
  interface FirebaseApp {
    storage?(url?: string): FirebaseStorage;
  }
}
