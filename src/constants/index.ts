import { FcLibrary } from "react-icons/fc";
import { GiCardPick, GiTrade } from "react-icons/gi";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { Settings } from "lucide-react";
import { SectionMenu } from "@/types";

export const MainDeckTypes = [
  "Effect Monster",
  "Flip Effect Monster",
  "Flip Tuner Effect Monster",
  "Gemini Monster",
  "Normal Monster",
  "Normal Tuner Monster",
  "Pendulum Effect Monster",
  "Pendulum Flip Effect Monster",
  "Pendulum Normal Monster",
  "Pendulum Tuner Effect Monster",
  "Ritual Effect Monster",
  "Ritual Monster",
  "Spell Card",
  "Spirit Monster",
  "Toon Monster",
  "Trap Card",
  "Tuner Monster",
  "Union Effect Monster",
];

export const ExtraDeckTypes = [
  "Fusion Monster",
  "Link Monster",
  "Pendulum Effect Fusion Monster",
  "Synchro Monster",
  "Synchro Pendulum Effect Monster",
  "Synchro Tuner Monster",
  "XYZ Monster",
  "XYZ Pendulum Effect Monster",
];

export const CARD_TYPES = [
  "Effect Monster",
  "Normal Monster",
  "Ritual Monster",
  "Fusion Monster",
  "Synchro Monster",
  "Xyz Monster",
  "Pendulum Monster",
  "Link Monster",
  "Spell Card",
  "Trap Card",
];

export const ATTRIBUTES = ["DARK", "DIVINE", "EARTH", "FIRE", "LIGHT", "WATER", "WIND"];

export const MONSTER_RACES = [
  "Aqua",
  "Beast",
  "Beast-Warrior",
  "Creator-God",
  "Cyberse",
  "Dinosaur",
  "Divine-Beast",
  "Dragon",
  "Fairy",
  "Fiend",
  "Fish",
  "Insect",
  "Machine",
  "Plant",
  "Psychic",
  "Pyro",
  "Reptile",
  "Rock",
  "Sea Serpent",
  "Spellcaster",
  "Thunder",
  "Warrior",
  "Winged Beast",
  "Wyrm",
  "Zombie",
];

export const DECK_TYPES = [
  { value: "main", label: "Main Deck" },
  { value: "extra", label: "Extra Deck" },
  { value: "side", label: "Side Deck" },
];

export const profileSections: SectionMenu[] = [
  {
    title: "Cartes Yu-Gi-Oh",
    description: "Gestion de tes cartes (collections, decks, etc...)",
    links: [
      {
        title: "Collections",
        href: "collections",
        description: "Voir et gérer vos collections",
        icon: FcLibrary,
        color: "bg-amber-100",
      },
      {
        title: "Mes Decks",
        href: "decks",
        description: "Accéder à vos decks enregistrés",
        icon: GiCardPick,
        color: "bg-indigo-100",
      },
      {
        title: "Compléter la database",
        href: "cards/new",
        description: "Ajouter de nouvelles cartes à la base",
        icon: BsDatabaseFillAdd,
        color: "bg-green-100",
      },
    ],
  },
  {
    title: "Social",
    description: "Intéragis avec les autres utilisateurs",
    links: [
      {
        title: "Echanges de cartes",
        href: "social/trade",
        description: "Fais des propositions d'échanges avec les autres utilisateurs",
        icon: GiTrade,
        color: "bg-neutral-200",
      },
    ],
  },
  {
    title: "Mon Compte",
    description: "Gestion et personnalisation de ton compte",
    links: [
      {
        title: "Paramètres",
        href: "settings",
        description: "Modifier vos informations et préférences",
        icon: Settings,
        color: "bg-neutral-200",
      },
    ],
  },
];
