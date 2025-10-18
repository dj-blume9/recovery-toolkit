export function getTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    const localToday = new Date();
    const localTodayStr = localToday.getFullYear() + '-' +
        String(localToday.getMonth() + 1).padStart(2, '0') + '-' +
        String(localToday.getDate()).padStart(2, '0');

    return localTodayStr;
}

export const formatDateDisplay = (dateIso: string): string => {
    // Parse the ISO date string as local date (YYYY-MM-DD)
    const parts = dateIso.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time to midnight for accurate comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

    if (dateOnly.getTime() === todayOnly.getTime()) {
      return 'Today';
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
      return 'Yesterday';
    } else {
      // Format as "Monday, Oct 14"
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    }
  };