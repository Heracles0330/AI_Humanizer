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
  return new Promise( (resolve) => {

    setTimeout(async () => {
      // Simple mock humanization (in reality, this would be the API response)
      const submitted_id = await fetch('https://humanize.undetectable.ai/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'dd410c04-f157-4f4c-9e41-b7d125f2b339'
        },
        body: JSON.stringify({
          "content": text,
          "readability": "High School",
          "purpose": "General Writing",
          "strength": "More Human",
          "model": "v11"
        }),
      }).then((res) => res.json().then((data) => data.id));
      while (true) {
        const humanized =await fetch(`https://humanize.undetectable.ai/document`, {
          method: 'POST',
          headers: {
            'apikey': 'dd410c04-f157-4f4c-9e41-b7d125f2b339',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "id": submitted_id
          })
        }).then((res) => res.json().then((data) => data.output));
        if (humanized) {
          resolve(humanized);
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }, 1500); // Simulate API call delay
  });
}

export function calculateCreditsNeeded(text: string): number {
  // Calculate based on character count
  return Math.ceil(text.length / 10);
}