declare global {
  interface Window {
    paypal: {
      Fastlane: (options: any) => Promise<{
        identity: any;
        profile: any;
        FastlanePaymentComponent: () => Promise<{
          render: (elementId: string) => Promise<void>;
          getPaymentToken: () => Promise<any>;
        }>;
        FastlaneWatermarkComponent: (options: any) => Promise<{
          render: (elementId: string) => Promise<void>;
        }>;
      }>;
    };
  }
}

export {};
