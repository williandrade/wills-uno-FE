const generateAvatarUrl = () => {
    const generateVariants = (length: number) => {
        return Array.from({length}, (_, i) => `variant${String(i + 1).padStart(2, '0')}`);
    }

    const eyebrowsVariants = generateVariants(15)
    const eyesVariants = generateVariants(26);
    const mouthVariants = generateVariants(30);

    const randomEyebrows = eyebrowsVariants[Math.floor(Math.random() * eyebrowsVariants.length)];
    const randomEyes = eyesVariants[Math.floor(Math.random() * eyesVariants.length)];
    const randomMouth = mouthVariants[Math.floor(Math.random() * mouthVariants.length)];
    const randomBackgroundColor = 'f2d3b1';

    return `https://api.dicebear.com/7.x/adventurer-neutral/svg?size=80&eyebrows=${randomEyebrows}&eyes=${randomEyes}&mouth=${randomMouth}&backgroundColor=${randomBackgroundColor}`;
}

export {
    generateAvatarUrl
}