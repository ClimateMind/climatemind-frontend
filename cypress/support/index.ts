export {};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: any) => void;
          prompt: () => void;
          callback: (response: { credential: string }) => void;
        };
      };
    };
  }
}
