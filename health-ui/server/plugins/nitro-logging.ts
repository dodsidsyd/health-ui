export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('beforeResponse', async (event, { body }) => {
    if (event.path.includes('/auth/')) {
      const config = useRuntimeConfig(event)
      const targetUrl = `${config.public.authApiURL}${event.path}`
      console.log(`[${new Date().toISOString()}] Proxying: ${event.path} -> ${targetUrl}`)
    }
  })
})
