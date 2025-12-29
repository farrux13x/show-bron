import posthog from 'posthog-js'

export function usePostHog() {
  posthog.init('phc_4U3qzUa9zOOdSVkxfyXzvZb7vv9ITP4KHlDKbBT6sjW', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2025-11-30',
    person_profiles: 'identified_only'
  })

  return { posthog }
}
