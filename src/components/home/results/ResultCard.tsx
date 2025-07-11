
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
    <div className="flex justify-center">
      <div
        className="bg-white p-12 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-2 w-full max-w-lg group"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative">
          <div
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          >
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          {title}
        </h3>
        <p className="text-gray-600 text-center text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
