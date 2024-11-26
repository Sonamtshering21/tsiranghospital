export { default } from "next-auth/middleware";
export const config = { 
    matcher: ["/dashboard"] // Apply middleware to multiple routes
  };