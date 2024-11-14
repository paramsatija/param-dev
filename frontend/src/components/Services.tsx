'use client'

export default function OurServices() {
  const services = [
    {
      title: 'AI-Powered Sales Intelligence',
      description: 'Get real-time insights and predictions to close deals faster.',
      icon: '🤖'
    },
    {
      title: 'Automated Lead Scoring',
      description: 'Prioritize your leads with machine learning algorithms.',
      icon: '📊'
    },
    {
      title: 'Smart CRM Integration',
      description: 'Seamlessly connect with your existing CRM systems.',
      icon: '🔄'
    }
  ]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to accelerate your sales
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="text-2xl">{service.icon}</span>
                  {service.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{service.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 