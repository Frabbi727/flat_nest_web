// Minimal typings for Google Identity Services (https://accounts.google.com/gsi/client)
interface GsiCredentialResponse {
  credential: string;
  select_by: string;
}

interface GsiButtonConfiguration {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: number;
}

interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string;
          callback: (response: GsiCredentialResponse) => void;
        }) => void;
        renderButton: (
          parent: HTMLElement,
          options: GsiButtonConfiguration
        ) => void;
        disableAutoSelect: () => void;
      };
    };
  };
}
