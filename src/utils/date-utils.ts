import { format, parseISO, isValid } from 'date-fns';

export const parseCustomDate = (dateString: string): string | null => {
    // First try to parse the string as an ISO date
    const parsedDate = parseISO(dateString);

    // Validate the parsed date
    if (!isValid(parsedDate)) {
        return null;
    }

    // Check if the string includes UTC or BST
    const isUTC = dateString.includes('UTC');
    const isBST = dateString.includes('BST');

    // Format the date
    let formattedDate = format(parsedDate, 'MMM dd, yyyy HH:mm');

    // Append timezone based on presence of UTC or BST
    if (isUTC) {
        formattedDate += ' (UTC)';
    } else if (isBST) {
        formattedDate += ' (BST)';
    }

    return formattedDate;
};
