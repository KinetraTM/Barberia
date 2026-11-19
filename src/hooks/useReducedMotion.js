import { useMediaQuery } from './useMediaQuery'

/**
 * true cuando el usuario pidió reducir el movimiento en su sistema.
 * Se usa para desactivar scroll suave, autoplay y transiciones largas.
 * @returns {boolean}
 */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
