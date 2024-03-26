import { ReactNode, Dispatch, SetStateAction } from 'react';
import { Role } from '@prisma/client';

export interface DummyNounDataInterface {
  id: string;
  category: string;
  polish_word: string;
  english_word: string;
  image_url: string;
  notes: string;
}

export type CreateUserProps = {
  clerkId: string;
  fullName: string | null;
  username: string;
  email: string;
  profileImage: string | null;
  role?: Role;
};

export type SpecificScrapeVerbType = {
  id: string | number;
  notes: string;
  polish_word: string;
  english_word: string;
  gram_case: {
    case: string;
    color: string;
    aspect: string;
  };
  word_image: {
    image_url: string;
    polish_word: string;
    english_word: string;
  };
  present: {
    present_ja: string;
    present_ty: string;
    present_on_ona_ono: string;
    present_my: string;
    present_wy: string;
    present_oni_one: string;
    present_ja_trans: string;
    present_ty_trans: string;
    present_on_ona_ono_trans: string;
    present_my_trans: string;
    present_wy_trans: string;
    present_oni_one_trans: string;
  };
  past_fem: {
    past_ja_fem: string;
    past_ty_fem: string;
    past_ona_fem: string;
    past_my_fem: string;
    past_wy_fem: string;
    past_one_fem: string;
    past_ja_fem_trans: string;
    past_ty_fem_trans: string;
    past_ona_fem_trans: string;
    past_my_fem_trans: string;
    past_wy_fem_trans: string;
    past_one_fem_trans: string;
  };
  past_masc: {
    past_ja_masc: string;
    past_ty_masc: string;
    past_on_masc: string;
    past_my_masc: string;
    past_wy_masc: string;
    past_oni_masc: string;
    past_ja_masc_trans: string;
    past_ty_masc_trans: string;
    past_on_masc_trans: string;
    past_my_masc_trans: string;
    past_wy_masc_trans: string;
    past_oni_masc_trans: string;
  };
  future_fem: {
    future_fem_ja: string;
    future_fem_ty: string;
    future_fem_ona: string;
    future_fem_my: string;
    future_fem_wy: string;
    future_fem_one: string;
    future_fem_ja_trans: string;
    future_fem_ty_trans: string;
    future_fem_ona_trans: string;
    future_fem_my_trans: string;
    future_fem_wy_trans: string;
    future_fem_one_trans: string;
  };
  future_masc: {
    future_masc_ja: string;
    future_masc_ty: string;
    future_masc_on: string;
    future_masc_my: string;
    future_masc_wy: string;
    future_masc_oni: string;
    future_masc_ja_trans: string;
    future_masc_ty_trans: string;
    future_masc_on_trans: string;
    future_masc_my_trans: string;
    future_masc_wy_trans: string;
    future_masc_oni_trans: string;
  };
  imp_future: {
    imp_future_ja: string;
    imp_future_ty: string;
    imp_future_on_ona_ono: string;
    imp_future_my: string;
    imp_future_wy: string;
    imp_future_oni_one: string;
    imp_future_ja_trans: string;
    imp_future_ty_trans: string;
    imp_future_on_ona_ono_trans: string;
    imp_future_my_trans: string;
    imp_future_wy_trans: string;
    imp_future_oni_one_trans: string;
  };
  imperative: {
    imperative_ja: string;
    imperative_ty: string;
    imperative_my: string;
    imperative_wy: string;
    imperative_oni: string;
    imperative_on_ona_oni: string;
    imperative_ja_trans: string;
    imperative_ty_trans: string;
    imperative_my_trans: string;
    imperative_wy_trans: string;
    imperative_oni_trans: string;
    imperative_on_ona_oni_trans: string;
  };
  conditional_feminine: {
    conditional_feminine_ja: string;
    conditional_feminine_ty: string;
    conditional_feminine_ona: string;
    conditional_feminine_my: string;
    conditional_feminine_wy: string;
    conditional_feminine_one: string;
    conditional_feminine_ja_trans: string;
    conditional_feminine_ty_trans: string;
    conditional_feminine_ona_trans: string;
    conditional_feminine_my_trans: string;
    conditional_feminine_wy_trans: string;
    conditional_feminine_one_trans: string;
  };
  conditional_masculine: {
    conditional_masculine_ja: string;
    conditional_masculine_ty: string;
    conditional_masculine_on: string;
    conditional_masculine_my: string;
    conditional_masculine_wy: string;
    conditional_masculine_oni: string;
    conditional_masculine_ja_trans: string;
    conditional_masculine_ty_trans: string;
    conditional_masculine_on_trans: string;
    conditional_masculine_my_trans: string;
    conditional_masculine_wy_trans: string;
    conditional_masculine_oni_trans: string;
  };
};

export type GenericScrapeVerbType = {
  id: string;
  notes: string;
  polish_word: string;
  english_word: string;
  gram_case: {
    case: string;
    color: string;
    aspect: string;
  };
  word_image: {
    image_url: string;
    polish_word: string;
    english_word: string;
  };
  present: { [key: string]: string };
  past_fem: { [key: string]: string };
  past_masc: { [key: string]: string };
  future_fem: { [key: string]: string };
  future_masc: { [key: string]: string };
  imp_future: { [key: string]: string };
  imperative: { [key: string]: string };
  conditional_feminine: { [key: string]: string };
  conditional_masculine: { [key: string]: string };
};

export type AddVerbProps = {
  verbObject: SpecificScrapeVerbType;
};

export interface Column {
  id: string;
  items: SpecificScrapeVerbType[];
}

export interface Columns {
  [key: string]: Column;
}

export type VerbFormProps = {
  columns?: Columns | undefined;
  currentVerb?: SpecificScrapeVerbType | undefined;
  setCurrentVerb?: Dispatch<SetStateAction<any>> | undefined;
  isEditing?: boolean | undefined;
  setIsEditing?: Dispatch<SetStateAction<boolean>> | undefined;
  isOpen?: boolean | undefined;
  onOpen?: () => void | undefined;
  onClose?: () => void | undefined;
};

export type NewUserKanbanProps = {
  clerkId: string;
  kanbanData: any;
};

export interface AddVerbsFromArrayProps {
  verbs: string[];
}

export type VerbType = {
  verbObject: SpecificScrapeVerbType;
};

export type HandleVerbSelectType = {
  value: string;
  label: string;
};

export type SelectOrCreateProps = {
  availableVerbs: string[];
  onVerbSelect: (selectedOption: HandleVerbSelectType) => void;
};

export interface ConjugationData {
  metaForm: string[];
  metaTranslation: string[];
}

export type ScrapeProps = {
  availableVerbs: string[];
};

export interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  availableVerbs: string[];
}

export interface DashboardLayoutProps {
  children: ReactNode;
  conjugationTool: ReactNode;
  conjugationForm: ReactNode;
  shutterstock: ReactNode;
}

export interface TenseData {
  [tense: string]: string[];
}

export interface OrderMapping {
  [tense: string]: string[];
}

export interface TenseStructure {
  [key: string]: {
    [subKey: string]: string;
  };
}

export type TenseMapType = {
  [key: string]: string;
};
