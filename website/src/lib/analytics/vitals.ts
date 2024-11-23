import { type NextWebVitalsMetric } from 'next/app'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Analytics implementation
  console.log(metric)

  // Example: Send to Google Analytics
  const analyticsId = process.env.NEXT_PUBLIC_GA_ID
  if (!analyticsId) return

  // When the metric is ready, send it to analytics
  window.gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    event_label: metric.id,
    non_interaction: true,
  })
} 