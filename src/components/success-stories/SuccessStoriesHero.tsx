
const SuccessStoriesHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Success Stories That
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Inspire Innovation
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover how leading companies across industries have transformed their operations 
            and achieved remarkable results with our AI solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesHero;
