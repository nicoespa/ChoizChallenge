import React from "react";

interface QuestionCardProps {
  question: string;
  options?: string[];
  type: "single" | "multiple" | "text";
  value: string | string[];
  onChange: (value: string | string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  helper?: string;
}

export default function QuestionCard({
  question,
  options = [],
  type,
  value,
  onChange,
  otherValue,
  onOtherChange,
  helper,
}: QuestionCardProps) {
  const isSelected = (opt: string) =>
    Array.isArray(value) ? value.includes(opt) : value === opt;

  const handleOptionChange = (opt: string) => {
    if (type === "multiple") {
      const arr = Array.isArray(value) ? value : [];
      if (arr.includes(opt)) {
        onChange(arr.filter((v) => v !== opt));
      } else {
        if (opt.toLowerCase().includes("ninguno")) {
          onChange([opt]);
        } else {
          onChange(arr.filter((v) => !v.toLowerCase().includes("ninguno")).concat(opt));
        }
      }
    } else {
      onChange(opt);
    }
  };

  const renderCheckmark = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div>
      <h2 className="text-[20px] font-medium text-gray-800 leading-[24px] tracking-[0px] text-left mb-4">
        {question}
      </h2>
      {type === "multiple" && (
        <p className="text-gray-600 mb-6 text-sm">Selecciona todas las opciones que apliquen.</p>
      )}
      {helper && (
        <p className="text-gray-600 mb-6 text-sm">{helper}</p>
      )}
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <label
            key={opt}
            className={`
              flex items-center px-4 py-3.5 rounded-lg border cursor-pointer transition-all w-full h-11
              ${isSelected(opt) 
                ? "border-gray-800 bg-white" 
                : "border-gray-200 bg-white hover:border-gray-300"
              }
            `}
            onClick={() => handleOptionChange(opt)}
          >
            <div className="flex items-center justify-center w-5 h-5 mr-3">
              <div className={`
                w-4 h-4 rounded-full border-2 flex items-center justify-center
                ${isSelected(opt) 
                  ? "border-gray-800 bg-gray-800" 
                  : "border-gray-300 bg-white"
                }
              `}>
                {isSelected(opt) && renderCheckmark()}
              </div>
            </div>
            <span className="text-[14px] font-normal text-gray-800 leading-[20px] tracking-[0px] text-left">{opt}</span>
          </label>
        ))}
        
        {options.includes("Otro") && isSelected("Otro") && (
          <div className="mt-4">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Cuéntanos cuál es el problema
            </h3>
            <textarea
              placeholder="Inserta tu respuesta aquí"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 focus:outline-none resize-none text-gray-800 placeholder-gray-500"
              rows={4}
              value={otherValue || ""}
              onChange={(e) => onOtherChange && onOtherChange(e.target.value)}
            />
          </div>
        )}
        
        {type === "text" && (
          <input
            type="text"
            placeholder="Escribe tu respuesta"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-800 focus:outline-none text-gray-800 placeholder-gray-500"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}