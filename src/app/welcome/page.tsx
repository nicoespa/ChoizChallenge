"use client";
import {useRouter} from "next/navigation";
import Image from "next/image";

export default function WelcomePage(){
    const router = useRouter();
    return(
        <div className="min-h-screen bg-purple-600 relative">
            <div className="relative h-3/4 flex flex-col">
                <div className="absolute inset-0 relative" style={{ height: '70vh', width: '100%' }}>
                    <Image 
                        src="/welcomeperson.jpg" 
                        alt="Persona sosteniendo smartphone" 
                        fill
                        className="object-cover transform scale-150 -translate-y-24"
                        priority
                        sizes="100vw"
                    />
                </div>
                
                <div className="absolute top-12 left-6 z-10">
                    <h1 className="text-white text-2xl font-bold tracking-tight">
                        Choiz
                    </h1>
                </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-6 pt-8 pb-8">
                <h2 className="text-[26px] font-medium text-main-violet mb-2 leading-[100%] tracking-[0px] text-left">
                    Bienvenido a Choiz
                </h2>
                
                <p className="text-[16px] font-normal text-dark-grey mb-6 leading-[125.8%] tracking-[0px] text-left">
                    Comienza tu tratamiento en tres pasos:
                </p>
                
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex-shrink-0"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-[16px] font-normal text-[#6B7280] leading-[18px] tracking-[0px] text-left">Completa tu expediente médico</span>
                            <div className="flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="#9F7CF7" strokeWidth="2"/>
                                    <polyline points="12,6 12,12 16,14" stroke="#9F7CF7" strokeWidth="2"/>
                                </svg>
                                <span className="text-xs text-[#9F7CF7]">2 min</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex-shrink-0"></div>
                        <span className="text-[16px] font-normal text-[#6B7280] leading-[18px] tracking-[0px] text-left">Explora las opciones de tratamiento</span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex-shrink-0"></div>
                        <span className="text-[16px] font-normal text-[#6B7280] leading-[18px] tracking-[0px] text-left">Paga y recibe tu tratamiento</span>
                    </div>
                </div>
                
                <button
                    className="w-full bg-[#292929] text-white text-lg font-semibold rounded-[48px] py-4 transition hover:bg-gray-700"
                    onClick={() => router.push("/form/0")}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}