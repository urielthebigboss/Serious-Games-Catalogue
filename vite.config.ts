
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: '/DrMorieProject/', // Remplace par le nom exact de ton dépôt GitHub
})