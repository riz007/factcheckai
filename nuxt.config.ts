// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  devServerHandlers: [],
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "FactCheckAI",
      meta: [
        {
          name: "description",
          content: "Separating fact from fiction with AI.",
        },
      ],
    },
  },
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
});
