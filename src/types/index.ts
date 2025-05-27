import { Types } from "mongoose";
import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from "react";
import { IconType } from "react-icons";

export type DeckType = "main" | "extra" | "side";

export interface YugiCards {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  attribute: string;
  img: string;
  price: number;
  deckType: string | null;
}

export interface Deck {
  id: string;
  name: string;
  main: YugiCards[];
  extra: YugiCards[];
  side: YugiCards[];
}

export interface YugiCardProps {
  card: YugiCards;
  trigger?: boolean;
  inDeck?: boolean;
  deckType?: string;
  selectedCards?: YugiCards[];
  setSelectedCards?: Dispatch<SetStateAction<YugiCards[]>>;
}

export interface DeckProps {
  allCards: YugiCards[];
}

export interface FooterLinks {
  logo: IconType;
  href: string;
}

interface isOpenStateProps {
  isOpen: boolean;
  setIsOpen: (s: boolean) => void;
}

export interface AddToDeckModalProps extends isOpenStateProps {
  deckType: DeckType;
}

export interface AuthProps {
  registered: boolean;
  setRegistered: (registered: boolean) => void;
}

export interface FormInputProps {
  id: string;
  label: string;
  type: string;
  name?: string;
  Logo?: IconType;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  "aria-label"?: string;
  "aria-required"?: boolean;
}

export type AuthUser = {
  pseudo?: string;
  email: string;
  password: string;
};

export type SessionUser = {
  id: string;
  pseudo: string;
  email: string;
};

export interface User {
  _id?: string;
  id: string;
  pseudo: string;
  email: string;
  password?: string;
  decks: Deck[];
}

export interface AnimatedTextProps {
  text: string;
  style?: string;
  decoration?: string;
}

export interface CardPrices {
  cardmarket_price?: string;
  tcgplayer_price?: string;
  ebay_price?: string;
  amazon_price: string;
  coolstuffinc_price?: string;
}

export interface FetchedCards {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  attribute: string;
  card_sets: {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
  }[];
  card_images: {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
  }[];
  card_prices: CardPrices[];
}

export interface FavoriteBtnProps {
  size?: number;
  color?: string;
  like?: () => void;
  unlike?: () => void;
  isFav: boolean;
  type: "button" | "submit" | "reset";
}

export interface CardFiltersQuery {
  search: string;
  page: number;
  limit: number;
  deckType: string;
  types: string[];
}

export interface FiltersBarProps {
  filters: CardFiltersQuery;
  onChange: (filters: Partial<CardFiltersQuery>) => void;
}

export type DeckAction =
  | { type: "RESET" }
  | { type: "CHANGE_NAME"; payload: { name: string } }
  | { type: "ADD_CARD"; payload: { cards: YugiCards[]; deckType: DeckType } }
  | { type: "REMOVE_CARD"; payload: { cardId: string | number; deckType: DeckType } };

export interface CollectionYugiCard {
  _id?: string;
  id: number;
  name: string;
  desc: string;
  atk?: number;
  def?: number;
  type: string;
  race?: string;
  attribute?: string;
  price: number;
  img: string;
  deckType: string;
  duplicate?: boolean;
}

export interface Collection {
  _id: Types.ObjectId | string;
  id: string;
  name: string;
  description?: string;
  cards: CollectionYugiCard[];
}
export interface CollectionYugiCardProps {
  card: CollectionYugiCard;
  selectedCards?: CollectionYugiCard[];
  setSelectedCards?: React.Dispatch<React.SetStateAction<CollectionYugiCard[]>>;
  onCardSelect?: (card: CollectionYugiCard) => void;
  onRemoveCard?: (card: CollectionYugiCard) => void;
  isEditMode?: boolean;
  showSelectionCounter?: boolean;
}

export type AddCardBtnProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
