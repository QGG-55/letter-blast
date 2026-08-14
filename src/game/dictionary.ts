const WORDS = new Set(['CASA','SOL','MAR','LUZ','LUNA','PAN','SAL','RED','REY','LEY','DIA','VIDA','AMOR','GATO','PERRO','MESA','RISA','RIO','OLA','ORO','FLOR','AIRE'])
export const isValidWord = (word: string) => word.length >= 3 && WORDS.has(word.toUpperCase())
