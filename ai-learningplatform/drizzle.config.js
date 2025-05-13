import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://accounts:npg_ZQFS5CA3RktX@ep-dry-wind-a4i0xsl6-pooler.us-east-1.aws.neon.tech/Ai-Learning-Platform?sslmode=require'
  }
});
