import React, { useState } from "react";
import Image from "next/image";

interface RecommendationCardProps {
  recommendationNumber: number;
  product: {
    nombre: string;
    ingredientes: string;
  };
  faqs?: any[];
  onSelect: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function RecommendationCard({
  recommendationNumber,
  product,
  faqs = [],
  onSelect,
  onPrev,
  onNext,
  hasNext = false,
  hasPrev = false,
}: RecommendationCardProps) {
  
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getProductImage = (productName: string) => {
    const images = {
      "DUTAXIDIL® Cápsulas": "/products/dutaxidil-capsulas.jpg",
      "DUTAXIDIL® Gel": "/products/dutaxidil-gel.jpg",
      "Minoxidil® Cápsulas": "/products/minoxidil-capsulas.jpg",
      "Biotina Plus®": "/products/biotina-plus.jpg"
    };
    return images[productName as keyof typeof images] || "/products/placeholder.jpg";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          onClick={onPrev}
          className="w-8 h-8 flex items-center justify-center text-gray-800"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="text-lg font-semibold text-gray-800">Choiz</div>
        
        <div className="w-8 h-8 flex items-center justify-center text-gray-800">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="h-0.5 bg-gray-200 rounded-full">
          <div className="h-0.5 bg-purple-600 rounded-full w-full"></div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <h1 className="text-lg font-bold text-gray-800 mb-6">
          Tratamiento recomendado en base a tus respuestas
        </h1>

        <div className="bg-white border border-gray-100 rounded-[24px] px-5 py-8 mb-6 shadow-lg">
          <h2 className="text-[20px] font-medium text-gray-700 leading-[25px] tracking-[0%] text-left mb-2">{product.nombre}</h2>
          <p className="text-[16px] font-medium text-gray-400 leading-[20px] tracking-[0%] text-left mb-4">{product.ingredientes}</p>
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-56 h-72 relative rounded-lg overflow-hidden">
                <Image 
                  src={getProductImage(product.nombre)}
                  alt={product.nombre}
                  fill
                  className="object-cover object-center transform scale-150"
                  priority
                  sizes="224px"
                />
              </div>
            </div>
          </div>

          <button 
            className="w-full bg-[#292929] text-white py-4 rounded-[48px] font-semibold"
            onClick={onSelect}
          >
            Seleccionar
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-[24px] px-5 py-8 shadow-lg">
          <div className="space-y-0">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => {
                const isExpanded = expandedFaqs.includes(index);
                return (
                  <div key={faq.id || index}>
                    <button 
                      className="w-full flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="text-gray-800 font-medium text-left">{faq.question || faq.pregunta}</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none"
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                                         {isExpanded && (
                       <div className="px-4 py-4 bg-gray-50 border-b border-gray-100 last:border-b-0">
                         <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                           {faq.answer || faq.respuesta ? (
                             <div className="whitespace-pre-line">
                               {faq.answer || faq.respuesta}
                             </div>
                           ) : (
                             <p>Respuesta en desarrollo...</p>
                           )}
                         </div>
                       </div>
                     )}
                  </div>
                );
              })
            ) : (
              <>
                <div>
                  <button 
                    className="w-full flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(0)}
                  >
                    <span className="text-gray-800 font-medium text-left">¿Por cuánto tiempo debo utilizar el medicamento?</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      className={`transition-transform duration-200 ${expandedFaqs.includes(0) ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                                     {expandedFaqs.includes(0) && (
                     <div className="px-4 py-4 bg-gray-50 border-b border-gray-100">
                       <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                         <p>
                           El tiempo de tratamiento varía según tu condición específica. 
                         </p>
                         <p>
                           <strong>• Período inicial:</strong> 3-6 meses para ver resultados iniciales
                         </p>
                         <p>
                           <strong>• Tratamiento completo:</strong> 12-18 meses para resultados óptimos
                         </p>
                         <p>
                           <strong>• Seguimiento:</strong> Consulta regular con tu médico para evaluar progreso
                         </p>
                       </div>
                     </div>
                   )}
                </div>
                
                <div>
                  <button 
                    className="w-full flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(1)}
                  >
                    <span className="text-gray-800 font-medium text-left">¿Quién fabrica este medicamento?</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      className={`transition-transform duration-200 ${expandedFaqs.includes(1) ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                                     {expandedFaqs.includes(1) && (
                     <div className="px-4 py-4 bg-gray-50 border-b border-gray-100">
                       <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                         <p>
                           Nuestros medicamentos son fabricados por laboratorios certificados y aprobados por las autoridades sanitarias correspondientes.
                         </p>
                         <p>
                           <strong>• Certificaciones:</strong> Cumplen con los más altos estándares de calidad y seguridad
                         </p>
                         <p>
                           <strong>• Regulación:</strong> Aprobados por las autoridades sanitarias correspondientes
                         </p>
                         <p>
                           <strong>• Calidad:</strong> Fabricados bajo estrictos controles de calidad
                         </p>
                       </div>
                     </div>
                   )}
                </div>
                
                <div>
                  <button 
                    className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(2)}
                  >
                    <span className="text-gray-800 font-medium text-left">¿Qué sucede en caso de presentar efectos adversos?</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      className={`transition-transform duration-200 ${expandedFaqs.includes(2) ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                                     {expandedFaqs.includes(2) && (
                     <div className="px-4 py-4 bg-gray-50">
                       <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                         <p>
                           Si experimentas efectos adversos, suspende el tratamiento inmediatamente y contacta a tu médico.
                         </p>
                         <p>
                           <strong>• Efectos comunes:</strong> Irritación local, enrojecimiento o picazón
                         </p>
                         <p>
                           <strong>• Acción inmediata:</strong> Suspende el tratamiento y consulta a tu médico
                         </p>
                         <p>
                           <strong>• Emergencias:</strong> En casos graves, busca atención médica de emergencia
                         </p>
                       </div>
                     </div>
                   )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 