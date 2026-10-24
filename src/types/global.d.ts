/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/compat/navigation" />

// Declare CSS module type so TypeScript accepts side-effect CSS imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// Declare image file types
declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}
