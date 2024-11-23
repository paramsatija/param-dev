import { Metadata } from 'next'

// Interface for meta tag props
interface MetaTagsProps {
  title: string
  description: string
  ogImage?: string
  noindex?: boolean
}

// Generate metadata for each page
export function generateMetadata({
  title,
  description,
  ogImage = '/images/og-image.jpg',
  noindex = false
}: MetaTagsProps): Metadata {
  return {
    title: `${title} | Cognifuse`,
    description,
    openGraph: {
      title: `${title} | Cognifuse`,
      description,
      images: [{ url: ogImage }],
      type: 'website',
      siteName: 'Cognifuse'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Cognifuse`,
      description,
      images: [ogImage],
      creator: '@cognifuse'
    },
    robots: noindex ? 'noindex, nofollow' : 'index, follow'
  }
} 