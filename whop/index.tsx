// Copiar a src/routes/index.tsx del proyecto de Whop (TanStack Start).
// La landing vive en public/inicio.html; la raíz del sitio manda ahí.
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ href: '/inicio.html' })
  },
})
