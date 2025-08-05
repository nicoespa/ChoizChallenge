"use client";
import { useFormContext } from "@/context/FormContext";
import { useRouter, useSearchParams } from "next/navigation";
import { questions } from "@/lib/questions";
import { useEffect, useState, Suspense } from "react";

function CheckoutContent() {
    const { answers } = useFormContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState<{
        nombre: string;
        ingredientes: string;
    } | null>(null);

    const getQuestionText = (questionId: string) => {
        const question = questions.find(q => q.id === questionId);
        return question?.question || questionId;
    };

    const formatAnswer = (answer: string | string[]) => {
        if (Array.isArray(answer)) {
            return answer.join(", ");
        }
        return answer;
    };

    useEffect(() => {
        const productParam = searchParams.get('product');
        console.log('Product param received:', productParam);
        if (productParam) {
            try {
                const product = JSON.parse(atob(productParam));
                console.log('Parsed product:', product);
                setSelectedProduct(product);
            } catch (error) {
                console.error('Error parsing product:', error);
            }
        } else {
            console.log('No product param found');
        }
    }, [searchParams]);

    const handleBackToWelcome = () => {
        router.push("/welcome");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
                <button 
                    onClick={handleBackToWelcome}
                    className="w-8 h-8 flex items-center justify-center text-gray-600"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                <div className="text-lg font-semibold">Choiz</div>
                
                <div className="w-8 h-8"></div>
            </div>

            <div className="px-4 pb-6">
                <div className="h-0.5 bg-gray-200 rounded-full">
                    <div className="h-0.5 bg-purple-600 rounded-full w-full"></div>
                </div>
            </div>

            <div className="px-4 pb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Resumen de tu consulta
                </h1>

                <div className="bg-white border border-gray-100 rounded-[24px] px-6 py-8 mb-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Tus respuestas
                    </h2>
                    
                    <div className="space-y-6">
                        {Object.entries(answers).map(([questionId, answer]) => (
                            <div key={questionId} className="border-b border-gray-100 pb-4 last:border-b-0">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    {getQuestionText(questionId)}
                                </h3>
                                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    {formatAnswer(answer)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-[24px] px-6 py-8 mb-6 shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Producto seleccionado
                    </h2>
                    
                    {selectedProduct ? (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-purple-800 mb-2">
                                {selectedProduct.nombre}
                            </h3>
                            <p className="text-purple-600 mb-3">
                                {selectedProduct.ingredientes}
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-sm text-purple-700">Recomendado según tus respuestas</span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="text-gray-600">No se seleccionó ningún producto</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <button 
                        className="w-full bg-[#292929] text-white py-4 rounded-[48px] font-semibold hover:bg-gray-800 transition-colors"
                        onClick={() => {
                            alert("¡Gracias por tu consulta! Te contactaremos pronto.");
                        }}
                    >
                        Confirmar consulta
                    </button>
                    
                    <button 
                        className="w-full bg-white border border-gray-300 text-gray-700 py-4 rounded-[48px] font-semibold hover:bg-gray-50 transition-colors"
                        onClick={() => router.push("/result")}
                    >
                        Ver otras opciones
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
} 