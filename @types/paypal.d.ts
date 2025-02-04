declare global {
  interface Window {
    paypal: {
      Fastlane: (options: any) => Promise<{
        identity: any;
        profile: any;
        FastlanePaymentComponent: () => Promise<any>;
        FastlaneWatermarkComponent: (options: any) => Promise<any>;
      }>;
    };
  }
}

export {};
