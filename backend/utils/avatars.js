// Avatar URLs for boys and girls
const avatars = {
  boy: Array.from(
    { length: 50 },
    (_, i) =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=boy${i}&gender=male`
  ),
  girl: Array.from(
    { length: 50 },
    (_, i) =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=girl${i}&gender=female`
  ),
};

// Get random avatar URL based on gender
export const getRandomAvatar = (gender) => {
  if (!avatars[gender]) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * avatars[gender].length);
  return avatars[gender][randomIndex];
};
