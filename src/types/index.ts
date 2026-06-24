/**
 * Core type definitions for the application.
 */

export interface BaseCocktail {
  id: number
  name: string
  image: string
  imageFallback: string
  ingredients: string[]
  description: string
  allergens: string[]
}

export interface AlcoholicCocktail extends BaseCocktail {
  hasAlcohol: true
  occasion: ("Aperitif" | "Evening/Night" | "With meal" | "Dessert")[]
  category: "boldAndClassic" | "refreshingAndLight" | "sweetAndFruity"
  spirit: "Whisky" | "Gin" | "Vodka" | "Rum" | "Tequila" | "Others"
}

export interface NonAlcoholicCocktail extends BaseCocktail {
  hasAlcohol: false
  category: "citrus" | "fruity" | "herbal"
  texture: "Smooth" | "Bubbly"
}

export type Cocktail = AlcoholicCocktail | NonAlcoholicCocktail

export interface QuizQuestion {
  textKey: string
  options: QuizOption[]
  isMulti: boolean
}

export type CurrentQuestion = Omit<QuizQuestion, 'options'> & {
  text: string
  options: string[]
}

export interface QuizOption {
  key: string
}

export type QuizAnswer = string | string[] | null
