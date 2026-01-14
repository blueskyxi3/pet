
export type PetCategory = '全部' | '狗狗' | '猫咪' | '小宠' | '水族';

export interface Pet {
  id: string;
  name: string;
  category: PetCategory;
  breed: string;
  age: string;
  gender: '公' | '母';
  price: number;
  description: string;
  image: string;
  traits: string[];
}

export interface CartItem {
  pet: Pet;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
