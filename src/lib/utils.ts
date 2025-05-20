import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function humanize(text: string): Promise<string> {
  // This is a mock implementation
  // In a real-world scenario, you would call the Undetectable AI API here
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock humanization (in reality, this would be the API response)
      const humanized = text
        .replace(/(?:is|are) able to/g, 'can')
        .replace(/(?:it is|there is) important/g, 'importantly')
        .replace(/in order to/g, 'to')
        .replace(/due to the fact that/g, 'because')
        .replace(/a large number of/g, 'many')
        .replace(/the majority of/g, 'most')
        .replace(/despite the fact that/g, 'although')
        .replace(/on the condition that/g, 'if')
        .replace(/in the event that/g, 'if')
        .replace(/subsequent to/g, 'after')
        .replace(/prior to/g, 'before')
        .replace(/for the purpose of/g, 'for')
        .replace(/(?:is|are) in possession of/g, 'has')
        .replace(/in close proximity to/g, 'near')
        .replace(/with reference to/g, 'about')
        .replace(/with regard to/g, 'about')
        .replace(/in the near future/g, 'soon');
      
      resolve(humanized);
    }, 1500); // Simulate API call delay
  });
}

export function calculateCreditsNeeded(text: string): number {
  // Calculate based on character count
  return Math.ceil(text.length / 10);
}