export interface WishType {
  title: string;
  url: string;
  position: number;
  id: number;
  isActive: boolean;
  isEditing: boolean;
  color: string;
  available: boolean;
}

export const wishList = [] as WishType[];
