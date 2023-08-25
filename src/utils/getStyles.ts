export const getTypeStyles = (type: string) => {
  switch (type) {
    case "normal":
      return {
        backgroundColor: "#A8A77A", // Normal
        color: "#ffffff",
      };
    case "rock":
      return {
        backgroundColor: "#B6A136", // Rock
        color: "#ffffff",
      };
    case "ground":
      return {
        backgroundColor: "#E2BF65", // Ground
        color: "#000000",
      };
    case "flying":
      return {
        backgroundColor: "#A98FF3", // Flying
        color: "#ffffff",
      };
    case "poison":
      return {
        backgroundColor: "#A33EA1", // Poison
        color: "#ffffff",
      };
    case "fighting":
      return {
        backgroundColor: "#C22E28", // Fighting
        color: "#ffffff",
      };
    case "bug":
      return {
        backgroundColor: "#A6B91A", // Bug
        color: "#ffffff",
      };
    case "grass":
      return {
        backgroundColor: "#7AC74C", // Grass
        color: "#000000",
      };
    case "water":
      return {
        backgroundColor: "#6390F0", // Water
        color: "#ffffff",
      };
    case "fire":
      return {
        backgroundColor: "#EE8130", // Fire
        color: "#ffffff",
      };
    case "steel":
      return {
        backgroundColor: "#B7B7CE", // Steel
        color: "#000000",
      };
    case "ghost":
      return {
        backgroundColor: "#735797", // Ghost
        color: "#ffffff",
      };
    case "electric":
      return {
        backgroundColor: "#F7D02C", // Electric
        color: "#000000",
      };
    case "ice":
      return {
        backgroundColor: "#96D9D6", // Ice
        color: "#000000",
      };
    case "dragon":
      return {
        backgroundColor: "#6F35FC", // Dragon
        color: "#ffffff",
      };
    case "psychic":
      return {
        backgroundColor: "#F95587", // Psychic
        color: "#ffffff",
      };
    case "dark":
      return {
        backgroundColor: "#705746", // Dark
        color: "#ffffff",
      };
    case "fairy":
      return {
        backgroundColor: "#D685AD", // Fairy
        color: "#000000",
      };
    default:
      return {
        backgroundColor: "#CCCCCC",
        color: "#000000",
      };
  }
};
