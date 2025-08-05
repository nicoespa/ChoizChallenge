import { questions } from '../questions';

describe('Questions Configuration', () => {
  test('should have 4 questions', () => {
    expect(questions).toHaveLength(4);
  });

  test('should have correct question IDs', () => {
    const expectedIds = ['q1', 'q2', 'q3', 'q4'];
    questions.forEach((question, index) => {
      expect(question.id).toBe(expectedIds[index]);
    });
  });

  test('should have required questions', () => {
    questions.forEach(question => {
      expect(question.required).toBe(true);
    });
  });

  test('should have correct question types', () => {
    expect(questions[0].type).toBe('multiple');
    expect(questions[1].type).toBe('single');
    expect(questions[2].type).toBe('multiple');
    expect(questions[3].type).toBe('multiple'); 
  });

  test('should have options for each question', () => {
    questions.forEach(question => {
      expect(question.options).toBeDefined();
      expect(question.options!.length).toBeGreaterThan(0);
    });
  });

  test('should have helper text for each question', () => {
    questions.forEach(question => {
      expect(question.helper).toBeDefined();
      expect(question.helper!.length).toBeGreaterThan(0);
    });
  });
}); 