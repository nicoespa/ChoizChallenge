import {FormProvider} from "@/context/FormContext"
import "./globals.css"
import type {Metadata} from "next"

export const metadata: Metadata = {title: "Formulario medico"};

export default function RootLayout({children}: {children: React.ReactNode}){
  return(
    <html lang="es">
      <body>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  )
}