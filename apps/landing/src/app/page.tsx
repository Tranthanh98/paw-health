export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">
          🐾 Paw Health
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          Your all-in-one ecosystem for managing your pet&apos;s health, nutrition,
          shopping and care services — powered by AI.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything for your pet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🏥", title: "Health Tracking", desc: "Monitor vet visits, vaccinations and health records." },
              { icon: "🥗", title: "Nutrition", desc: "Personalized diet plans and nutrition tracking." },
              { icon: "🛍️", title: "Shopping", desc: "Shop for all your pet needs in one place." },
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
