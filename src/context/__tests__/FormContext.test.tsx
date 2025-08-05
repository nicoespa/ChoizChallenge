import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { FormProvider, useFormContext } from '../FormContext';

// Test component to access context
const TestComponent = () => {
  const { answers, setAnswer, resetForm } = useFormContext();
  return (
    <div>
      <div data-testid="answers">{JSON.stringify(answers)}</div>
      <button 
        data-testid="set-answer" 
        onClick={() => setAnswer('q1', ['test'])}
      >
        Set Answer
      </button>
      <button 
        data-testid="reset-form" 
        onClick={resetForm}
      >
        Reset Form
      </button>
    </div>
  );
};

describe('FormContext', () => {
  test('should provide initial empty answers', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    const answersElement = screen.getByTestId('answers');
    expect(answersElement.textContent).toBe('{}');
  });

  test('should update answers when setAnswer is called', async () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    const setAnswerButton = screen.getByTestId('set-answer');
    await act(async () => {
      setAnswerButton.click();
    });

    const answersElement = screen.getByTestId('answers');
    expect(answersElement.textContent).toBe('{"q1":["test"]}');
  });

  test('should reset answers when resetForm is called', async () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    // First set an answer
    const setAnswerButton = screen.getByTestId('set-answer');
    await act(async () => {
      setAnswerButton.click();
    });

    // Then reset
    const resetButton = screen.getByTestId('reset-form');
    await act(async () => {
      resetButton.click();
    });

    const answersElement = screen.getByTestId('answers');
    expect(answersElement.textContent).toBe('{}');
  });

  test('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('FormContext must be used within a FormProvider');
    
    consoleSpy.mockRestore();
  });
}); 