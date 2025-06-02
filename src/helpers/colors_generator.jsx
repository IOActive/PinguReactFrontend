export const generateShade = (index, totalBars) => {
    const startHue = 224; // Base brand color hue
    const startSaturation = 90;
    const startLightness = 70; // Start with a lighter version of #5d80f9

    const endHue = 270; // Slightly different hue for a nice transition
    const endSaturation = 80;
    const endLightness = 50; // Ends with a darker version #4d4ded

    // Interpolating between start and end values based on index
    const hue = startHue + ((endHue - startHue) * (index / totalBars) * 2);
    const saturation = startSaturation + ((endSaturation - startSaturation) * (index / totalBars));
    const lightness = startLightness + ((endLightness - startLightness) * (index / totalBars));

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};