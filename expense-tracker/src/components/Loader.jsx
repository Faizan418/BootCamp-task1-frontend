export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 relative overflow-hidden">
      {/* Swirl container */}
      <div className="relative w-40 h-40">
        {/* Neon swirl dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute top-1/2 left-1/2 w-3 h-3 bg-pink-400 rounded-full animate-swirl delay-${i * 150}`}
          ></div>
        ))}

        {/* Rotating outer neon ring */}
        <div className="absolute inset-0 border-4 border-pink-600 rounded-full animate-spin-slow opacity-60 blur-sm"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-12 text-pink-400 text-xl font-bold tracking-wide animate-pulse">
        Loading...
      </p>

      {/* Tailwind custom animations */}
      <style jsx>{`
        @keyframes swirl {
          0% {
            transform: rotate(0deg) translateX(6rem) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(6rem) rotate(-360deg);
          }
        }
        .animate-swirl {
          animation: swirl 2s linear infinite;
        }
        ${[...Array(6)]
          .map(
            (_, i) =>
              `.delay-${i * 150} { animation-delay: ${i * 0.15}s; }`
          )
          .join("\n")}
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
