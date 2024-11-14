import { ReactElement } from 'react'
import { 
  MessageCircle, 
  Briefcase, 
  Database, 
  Mail, 
  MessageSquare, 
  Building2
} from 'lucide-react'
import { Integration, IntegrationType } from '@/types/integrations'

export const INTEGRATION_CONFIG: Record<IntegrationType, Integration> = {
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM, Marketing, and Sales Platform',
    iconComponent: Briefcase,
    iconColor: 'text-orange-500',
    category: 'crm',
    docsUrl: 'https://developers.hubspot.com',
    features: ['Contacts', 'Deals', 'Companies', 'Marketing'],
    status: 'stable'
  },
  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Enterprise CRM Solution',
    iconComponent: Database,
    iconColor: 'text-blue-500',
    category: 'crm',
    docsUrl: 'https://developer.salesforce.com',
    features: ['Leads', 'Opportunities', 'Accounts', 'Reports'],
    status: 'stable'
  },
  google: {
    id: 'google',
    name: 'Google Workspace',
    description: 'Email and Calendar Integration',
    iconComponent: Mail,
    iconColor: 'text-red-500',
    category: 'productivity',
    docsUrl: 'https://developers.google.com/workspace',
    features: ['Gmail', 'Calendar', 'Drive', 'Meet'],
    status: 'beta'
  },
  slack: {
    id: 'slack',
    name: 'Slack',
    description: 'Team Communication Platform',
    iconComponent: MessageSquare,
    iconColor: 'text-purple-500',
    category: 'communication',
    docsUrl: 'https://api.slack.com',
    features: ['Messages', 'Channels', 'Files', 'Apps'],
    status: 'beta'
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Business Messaging Platform',
    iconComponent: MessageCircle,
    iconColor: 'text-green-500',
    category: 'communication',
    docsUrl: 'https://developers.facebook.com/docs/whatsapp',
    features: ['Messages', 'Templates', 'Contacts'],
    status: 'stable'
  },
  sap: {
    id: 'sap',
    name: 'SAP',
    description: 'Enterprise Resource Planning',
    iconComponent: Building2,
    iconColor: 'text-gray-500',
    category: 'erp',
    docsUrl: 'https://developers.sap.com',
    features: ['Finance', 'HR', 'Logistics', 'Analytics'],
    status: 'alpha'
  }
}

export { type Integration, type IntegrationType } from '@/types/integrations'

export function getIntegrationIcon(type: IntegrationType): ReactElement | null {
  const integration = INTEGRATION_CONFIG[type]
  if (!integration) return null
  
  const IconComponent = integration.iconComponent
  return IconComponent ? <IconComponent className={`w-6 h-6 ${integration.iconColor}`} /> : null
}

export function getIntegrationColor(type: IntegrationType): string {
  const integration = INTEGRATION_CONFIG[type]
  return integration?.iconColor || 'text-gray-500'
}

export function getIntegrationDetails(type: IntegrationType): Integration | null {
  return INTEGRATION_CONFIG[type] || null
} 