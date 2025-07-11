
interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
}

const ResultCard = ({ icon, title, description, index, backgroundColor, backgroundOpacity }: ResultCardProps) => {
  return (
    <div
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex-shrink-0">
        <div
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        >
          {icon}
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-center text-sm leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
