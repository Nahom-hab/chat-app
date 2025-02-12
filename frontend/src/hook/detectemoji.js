
export const detectTextType = (text) => {
    // Regular expression to detect emojis
    const emojiRegex = /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F900}-\u{1F9FF}|\u{1F1E6}-\u{1F1FF}]/gu;

    // Check if text is empty or has spaces only
    if (!text.trim()) {
        return "text";
    }

    // Split the text into characters
    const characters = Array.from(text);

    // Flags to track the presence of emojis and text
    let hasEmoji = false;
    let hasText = false;

    // Loop through each character to determine if it's an emoji or text
    for (let char of characters) {
        if (emojiRegex.test(char)) {
            hasEmoji = true;
        } else if (char.trim().length > 0) {
            hasText = true;
        }
    }

    // Determine the final result based on the flags
    if (hasEmoji) {
        return "emoji";
    } else {
        return "text";
    }
}

export const isImageUrl = (url) => {
    // Updated regex to account for query parameters and encoded URLs
    const imageRegex = /\.(jpg|jpeg|png|gif|jfif|bmp|webp|svg)(\?.*)?$/i;

    // Test the URL against the regex
    return imageRegex.test(decodeURIComponent(url));
};

// Example usage with your Firebase URL