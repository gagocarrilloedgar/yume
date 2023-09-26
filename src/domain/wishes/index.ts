import { Wish as PrismaWish } from "@prisma/client";
import { COLORS } from "~/theme";

type WishEditinUIProps = {
  isEditing: boolean;
  color: string;
};

export type Wish = {
  id: PrismaWish["id"];
} & PrismaWish &
  WishEditinUIProps;

export const mapWishesToUI = (wishes: Wish[]) => {
  const shuffledColors = shuffleArray(Object.values(COLORS));

  return wishes.map((wish, index) =>
    convertToUIWish(
      wish,
      shuffledColors[index % shuffledColors.length] as string
    )
  );
};

export const convertToUIWish = (wish: Wish, color: string): Wish => {
  return {
    ...wish,
    isEditing: false,
    color: color
  };
};

function shuffleArray(array: string[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j],
      shuffledArray[i]
    ] as [string, string];
  }
  return shuffledArray;
}
