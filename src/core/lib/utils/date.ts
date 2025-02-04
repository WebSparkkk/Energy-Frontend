export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    return '-';
  }
}

export function getCurrentDateTime(): string {
  return new Date().toISOString();
}

export function calculateDuration(startTime: string, endTime?: string): string {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date();
  const durationInMinutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function calculateCost(startTime: string, hourlyRate: number, endTime?: string): number {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date();
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return Math.round(durationInHours * hourlyRate * 100) / 100;
}