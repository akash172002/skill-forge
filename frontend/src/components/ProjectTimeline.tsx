interface Props {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function ProjectTimeline({ status }: Props) {
  const steps = ["Submitted", "Reviewed", "Completed"];

  const activeIndex = status === "PENDING" ? 1 : status === "APPROVED" ? 2 : 1;

  return (
    <div className="flex items-center gap-4 mt-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              index <= activeIndex
                ? status === "REJECTED"
                  ? "bg-red-500"
                  : "bg-green-500"
                : "bg-gray-300"
            }`}
          />
          <span className="text-sm text-gray-600">{step}</span>
          {index < steps.length - 1 && (
            <div className="w-10 h-px bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}
