
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
      className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 aspect-square flex flex-col group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col items-center mb-2">
        <div
          className="w-10 h-10 mb-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        >
          {icon}
        </div>
        <h3 className="text-sm font-bold text-gray-900 text-center leading-tight">
          {title}
        </h3>
      </div>
      <div className="flex-grow flex items-end">
        <p className="text-gray-600 text-center text-xs leading-snug w-full">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
