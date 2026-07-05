/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REGISTRATION_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}