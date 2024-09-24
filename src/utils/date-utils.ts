export const parseCustomDate = (dateString: string): Date | null => {
    const regex = /([A-Za-z]+ \d{1,2}, \d{4}) at (\d{2}:\d{2})/;
    const match = dateString.match(regex);

    if (match) {
        const [_, datePart, timePart] = match;
        const fullDate = `${datePart} ${timePart}`; // Do not append UTC
        return new Date(fullDate); // This will rely on the time zone present in the string
    }

    return null;
};
