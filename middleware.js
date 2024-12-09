export { default } from "next-auth/middleware";
export const config = { 
    matcher: ["/dashboard",'/dashboard/annoucement', '/dashboard/text','/dashboard/adminannoucement'] // Apply middleware to multiple routes
  };