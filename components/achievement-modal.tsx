"use client"

import { memo } from "react"
import { X } from "lucide-react"
import { achievements } from "../data/achievements"

interface AchievementModalProps {
  achievementIndex: number
  onClose: () => void
}

export const AchievementModal = memo(function AchievementModal({ achievementIndex, onClose }: AchievementModalProps) {
  const achievement = achievements[achievementIndex]

  if (!achievement) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 max-w-lg mx-4 shadow-2xl transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-4">
          <div className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-3">
            {achievement.year}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{achievement.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Description Complète
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {achievement.details.fullDescription}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Impact
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{achievement.details.impact}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              Réalisations Clés
            </h4>
            <ul className="space-y-1">
              {achievement.details.achievements.map((item, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mr-2 flex-shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
})
