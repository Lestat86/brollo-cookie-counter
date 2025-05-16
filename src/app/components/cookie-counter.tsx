'use client'

import React from 'react'
import clsx from 'clsx'
import { useCookieCounts } from '../hooks/useCookieCount'
import { Github } from 'lucide-react'

interface CookieClass {
  name: string
  gradientClasses: string
  bgLightClass: string
  mainColor: string
  borderColor: string
  bgMainClass: string
}

interface CookieCounterProps {
  editMode?: boolean
}

const classes: CookieClass[] = [
  { name: 'Azzurri', gradientClasses: 'from-blue-100 to-white', bgLightClass: 'bg-blue-100', mainColor: 'text-blue-600', borderColor: 'border-blue-600', bgMainClass: 'bg-blue-600' },
  { name: 'Gialli',   gradientClasses: 'from-yellow-100 to-white', bgLightClass: 'bg-yellow-100', mainColor: 'text-yellow-600', borderColor: 'border-yellow-600', bgMainClass: 'bg-yellow-600' },
  { name: 'Rossi',    gradientClasses: 'from-rose-100 to-white',   bgLightClass: 'bg-rose-100',   mainColor: 'text-red-600',    borderColor: 'border-red-600',    bgMainClass: 'bg-red-600'   }
]

export const CookieCounter: React.FC<CookieCounterProps> = ({ editMode = false }) => {
  const { counts, inc, dec, isLoading } = useCookieCounts()

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Caricamento…</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6 flex flex-col">
      {/* Titolo principale */}
      <header className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg">
        <span className="text-4xl mr-4">🍪</span>
        <h1 className="text-4xl font-extrabold text-gray-800">Scuola primaria G. Brollo</h1>
      </header>

      {classes.map((cls) => (
        <div key={cls.name} className={clsx(
          'flex flex-col items-center p-6 rounded-2xl shadow-lg transform hover:-translate-y-1 transition',
          `bg-gradient-to-br ${cls.gradientClasses}`
        )}>
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">🍪</span>
            <h2 className={clsx('text-3xl font-extrabold', cls.mainColor)}>{cls.name}</h2>
          </div>

          <div className={clsx('inline-flex p-4 rounded-xl shadow-md', cls.bgLightClass)}>
            {editMode ? (
              <div className="flex items-center space-x-4">
                <button onClick={() => dec(cls.name)} className={clsx(
                  'w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-full transform hover:scale-110 transition',
                  'bg-white', cls.borderColor, cls.mainColor
                )}>−</button>
                <span className={clsx('text-4xl font-bold min-w-[3rem] text-center', cls.mainColor)}>{counts[cls.name]}</span>
                <button onClick={() => inc(cls.name)} className={clsx(
                  'w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-full transform hover:scale-110 transition',
                  cls.bgMainClass, 'text-white'
                )}>+</button>
              </div>
            ) : (
              <span className={clsx('text-4xl font-bold text-center', cls.mainColor)}>{counts[cls.name]}</span>
            )}
          </div>
        </div>
      ))}
      <footer className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg mt-auto">
        <p className="text-xs text-gray-600 mb-2">Creato da Alberto Ronchi</p>
        <div className="flex items-center space-x-4">
          <a href="mailto:alberto.ronchi786@gmail.com" className="text-xs text-gray-500 hover:text-gray-700">
            alberto.ronchi786@gmail.com
          </a>
          <a href="https://github.com/Lestat86" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-500 hover:text-gray-700 text-xs">
            <Github className="w-5 h-5 mr-1" />
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default CookieCounter
