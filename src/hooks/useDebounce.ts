/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

type Timer = ReturnType<typeof setTimeout>

type DebouncedFunction = (...args: any[]) => void

export function useDebounce<Func extends DebouncedFunction>(
  func: Func,
  timeout = 800,
) {
  const timer = useRef<Timer>()

  useEffect(() => {
    return () => {
      if (!timer.current) {
        return
      }

      clearTimeout(timer.current)
    }
  }, [])

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args)
    }, timeout)

    clearTimeout(timer.current)

    timer.current = newTimer
  }) as Func

  return debouncedFunction
}
