import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";

interface ResultCardProps {
  result: "Good" | "Bad";
  confidence?: number;
}

export function ResultCard({ result, confidence = 95 }: ResultCardProps) {
  const isGood = result === "Good";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`p-6 rounded-2xl border-2 ${
        isGood
          ? "bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/50"
          : "bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/50"
      } shadow-2xl`}
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        {isGood ? (
          <CheckCircle className="w-16 h-16 text-green-400" />
        ) : (
          <XCircle className="w-16 h-16 text-red-400" />
        )}
      </div>
      <h3
        className={`text-center mb-2 ${
          isGood ? "text-green-400" : "text-red-400"
        }`}
      >
        Air Quality: {result}
      </h3>
      <p className="text-center text-gray-400">
        Prediction Confidence: {confidence}%
      </p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${confidence}%` }}
        transition={{ duration: 1, delay: 0.3 }}
        className={`h-2 rounded-full mt-4 ${
          isGood ? "bg-green-500" : "bg-red-500"
        }`}
      />
    </motion.div>
  );
}
