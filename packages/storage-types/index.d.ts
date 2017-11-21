import { Observer, Unsubscribe } from "@firebase/util";
import { FirebaseApp, FirebaseNamespace } from "@firebase/app-types";

interface Metadata {
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
  ref(path?: string): Reference;
  refFromURL(url: string): Reference;
  setMaxOperationRetryTime(time: number): any;
  setMaxUploadRetryTime(time: number): any;
}

export interface FullMetadata extends UploadMetadata {
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

export interface Reference {
  bucket: string;
  child(path: string): Reference;
  delete(): Promise<any>;
  fullPath: string;
  getDownloadURL(): Promise<any>;
  getMetadata(): Promise<any>;
  name: string;
  parent: Reference | null;
  put(
    data: any | any | any,
    metadata?: UploadMetadata
  ): UploadTask;
  putString(
    data: string,
    format?: StringFormat,
    metadata?: UploadMetadata
  ): UploadTask;
  root: Reference;
  storage: FirebaseStorage;
  toString(): string;
  updateMetadata(metadata: Metadata): Promise<any>;
}

export interface Metadata {
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

type TaskEvent = string;
declare var TaskEvent: {
  STATE_CHANGED: TaskEvent;
};

type TaskState = string;
declare var TaskState: {
  CANCELED: TaskState;
  ERROR: TaskState;
  PAUSED: TaskState;
  RUNNING: TaskState;
  SUCCESS: TaskState;
};

export interface UploadMetadata extends Metadata {
  md5Hash?: string | null;
}

export interface UploadTask {
  cancel(): boolean;
  catch(onRejected: (a: Error) => any): Promise<any>;
  on(
    event: TaskEvent,
    nextOrObserver?:
      | Observer<any, any>
      | null
      | ((a: Object) => any),
    error?: ((a: Error) => any) | null,
    complete?: (Unsubscribe) | null
  ): Function;
  pause(): boolean;
  resume(): boolean;
  snapshot: UploadTaskSnapshot;
  then(
    onFulfilled?: ((a: UploadTaskSnapshot) => any) | null,
    onRejected?: ((a: Error) => any) | null
  ): Promise<any>;
}

export interface UploadTaskSnapshot {
  bytesTransferred: number;
  downloadURL: string | null;
  metadata: FullMetadata;
  ref: Reference;
  state: TaskState;
  task: UploadTask;
  totalBytes: number;
}

declare module '@firebase/app-types' {
  interface FirebaseNamespace {
    storage?: {
      (app?: FirebaseApp): FirebaseStorage;
      Storage: {
        new(): FirebaseStorage
      }
    }
  }
  interface FirebaseApp {
    storage?(url?: string): FirebaseStorage;
  }
}
