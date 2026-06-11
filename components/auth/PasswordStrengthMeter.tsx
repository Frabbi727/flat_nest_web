"use client";

type Level = 0 | 1 | 2 | 3 | 4;

function getStrength(password: string): Level {
  if (!password || password.length < 8) return 0;
  let level = 1;
  if (/[A-Z]/.test(password)) level++;
  if (/[0-9]/.test(password)) level++;
  if (/[^A-Za-z0-9]/.test(password)) level++;
  return level as Level;
}

const LABELS: Record<Level, string> = {
  0: "",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

const BAR_COLORS: Record<Level, string> = {
  0: "",
  1: "bg-red-500",
  2: "bg-orange-400",
  3: "bg-yellow-500",
  4: "bg-green-500",
};

const LABEL_COLORS: Record<Level, string> = {
  0: "",
  1: "text-red-500",
  2: "text-orange-500",
  3: "text-yellow-600",
  4: "text-green-600",
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const strength = getStrength(password);

  return (
    <div className="space-y-1 pt-1">
      <div className="flex gap-1">
        {([1, 2, 3, 4] as Level[]).map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              strength >= level ? BAR_COLORS[strength] : "bg-muted"
            }`}
          />
        ))}
      </div>
      {strength > 0 && (
        <p className={`text-xs font-medium ${LABEL_COLORS[strength]}`}>
          {LABELS[strength]}
        </p>
      )}
    </div>
  );
}
