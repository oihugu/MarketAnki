/**
 * Spaced Repetion Algorithm (inspired by SM-2)
 */

export interface Flashcard {
	id: string;
	question: string;
	answer: string;
	context: string;
	nextReview: Date;
	interval: number; // in days
	easeFactor: number;
	repetitions: number;
}

export type Grade = 0 | 1 | 2; // 0: Mal, 1: Neutro, 2: Bem

export const calculateNextReview = (card: Flashcard, grade: Grade): Flashcard => {
	let { interval, easeFactor, repetitions } = card;

	if (grade >= 1) { // Neutro ou Bem
		if (repetitions === 0) {
			interval = 1;
		} else if (repetitions === 1) {
			interval = 6;
		} else {
			interval = Math.round(interval * easeFactor);
		}
		repetitions += 1;
	} else {
		// Mal - recomeça
		repetitions = 0;
		interval = 1;
	}

	// Ajuste do fator de facilidade (simplificado)
	if (grade === 2) easeFactor += 0.1;
	if (grade === 0) easeFactor -= 0.2;

	// Limites para o easeFactor
	easeFactor = Math.max(1.3, easeFactor);

	const nextReview = new Date();
	nextReview.setDate(nextReview.getDate() + interval);

	return {
		...card,
		interval,
		easeFactor,
		repetitions,
		nextReview,
	};
};
