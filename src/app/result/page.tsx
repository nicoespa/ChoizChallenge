"use client";
import {useEffect, useState} from "react";
import { useFormContext } from "@/context/FormContext";
import { useRouter } from "next/navigation";
import RecommendationCard from "@/components/RecommendationCard";

export default function ResultPage(){
    const {answers} = useFormContext();
    const router = useRouter();
    const [faqs, setFaqs] = useState<Array<{
        id?: string;
        question?: string;
        pregunta?: string;
        answer?: string;
        respuesta?: string;
    }>>([]);
    const [currentRecommendation, setCurrentRecommendation] = useState(0);

    useEffect(() => {
        fetch("https://679938bebe2191d708b25ceb.mockapi.io/api/faqs")
            .then(res => res.json())
            .then(setFaqs)
            .catch(error => console.error("Error fetching FAQs:", error));
    }, []);

    const condMedicas = answers["q3"] || [];
    const condiciones = Array.isArray(condMedicas) ? condMedicas : [condMedicas];

    const recommendations: Array<{
        product: {
            nombre: string;
            ingredientes: string;
        };
    }> = [];

    if (condiciones.includes("Cáncer de mama") || condiciones.includes("Cáncer de próstata")){
        recommendations.push({
            product: {
                nombre: "Minoxidil® Cápsulas",
                ingredientes: "Minoxidil 2.5 mg + Biotina 2.5 mg"
            }
        });
    } else if (condiciones.length === 0 || condiciones.includes("No, ninguna de las anteriores")){
        recommendations.push({
            product: {
                nombre: "DUTAXIDIL® Cápsulas",
                ingredientes: "Dutasterida 0.5 mg + Minoxidil 2.5 mg + Biotina 2.5 mg"
            }
        });
    } else {
        recommendations.push({
            product: {
                nombre: "DUTAXIDIL® Gel",
                ingredientes: "Dutasterida 0.1% + Minoxidil 5% + Tretinoína 1% + Hidrocortisona 1%"
            }
        });
    }

    if (condiciones.includes("Cáncer de mama") || condiciones.includes("Cáncer de próstata")){
        recommendations.push({
            product: {
                nombre: "DUTAXIDIL® Gel",
                ingredientes: "Dutasterida 0.1% + Minoxidil 5% + Tretinoína 1% + Hidrocortisona 1%"
            }
        });
    } else {
        recommendations.push({
            product: {
                nombre: "Minoxidil® Cápsulas",
                ingredientes: "Minoxidil 2.5 mg + Biotina 2.5 mg"
            }
        });
    }

    recommendations.push({
        product: {
            nombre: "Biotina Plus®",
            ingredientes: "Biotina 5 mg + Zinc 15 mg + Vitamina E 400 UI"
        }
    });

    const handleSelect = () => {
        const selectedProduct = recommendations[currentRecommendation].product;
        const productParam = encodeURIComponent(JSON.stringify(selectedProduct));
        router.push(`/checkout?product=${productParam}`);
    };

    const handleNext = () => {
        if (currentRecommendation < recommendations.length - 1) {
            setCurrentRecommendation(currentRecommendation + 1);
        }
    };

    const handlePrev = () => {
        if (currentRecommendation > 0) {
            setCurrentRecommendation(currentRecommendation - 1);
        } else {
            router.push("/welcome");
        }
    };

    if (recommendations.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800 mb-4">No hay recomendaciones disponibles</h1>
                    <button 
                        onClick={() => router.push("/welcome")}
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    const currentRec = recommendations[currentRecommendation];

    return (
        <RecommendationCard
            product={currentRec.product}
            faqs={faqs}
            onSelect={handleSelect}
            onPrev={handlePrev}
        />
    );
}
