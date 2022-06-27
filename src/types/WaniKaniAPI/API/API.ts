type ResponseObjectType = "collection" | "report";
type SubjectObjectType = "kanji" | "radical" | "vocabulary";

export interface ResponsePages {
  per_page: number;
  next_url: string | null;
  previous_url: string | null;
}

export interface Meaning {
  meaning: string;
  primary: boolean;
  accepted_answer: boolean;
}

export interface AuxiliaryMeaning {
  meaning: string;
  type: "whitelist" | "blacklist";
}

export interface SubjectData {
  auxiliary_meanings: AuxiliaryMeaning[];
  characters: string | null;
  created_at: string;
  document_url: string;
  hidden_at: string | null;
  lesson_position: number;
  level: number;
  meaning_mnemonic: string;
  meanings: Meaning[];
  slug: string;
  spaced_repetition_system_id: number;
}

export interface SVGChracterImageMetaData extends CharacterImageMetaData {
  inline_styles: boolean;
}

export interface PNGChracterImageMetaData extends CharacterImageMetaData {
  color: string;
  dimensions: string;
  style_name: string;
}

export interface CharacterImageMetaData {
  inline_styles?: boolean;
  color?: string;
  dimensions?: string;
  style_name?: string;
}

export interface CharacterImage {
  url: string;
  content_type: "image/png" | "image/svg+xml";
  metadata: CharacterImageMetaData;
}

export interface Radical extends SubjectData {
  amalgamation_subject_ids: number[];
  character_images: CharacterImage[];
}

export interface Reading {
  accepted_answer: boolean;
  primary: boolean;
  reading: string;
}

export interface ContextSentence {
  en: string;
  ja: string;
}

export interface PronunciationAudioMetaData {
  gender: string;
  source_id: number;
  pronunciation: string;
  voice_actor_id: number;
  voice_actor_name: string;
  voice_description: string;
}

export interface PronunciationAudio {
  url: string;
  content_type: string;
  metadata: PronunciationAudioMetaData;
}

export interface Vocabulary extends SubjectData {
  component_subject_ids: number[];
  context_sentences: ContextSentence[];
  meaning_mnemonic: string;
  parts_of_speech: string[];
  pronunciation_audios: PronunciationAudio[];
  readings: Reading[];
  reading_mnemonic: string;
}


export interface Subject {
  id: number;
  object: SubjectObjectType;
  url: string;
  data_updated_at: string;
  data: Vocabulary | Kanji | Radical;
}

export interface Response {
  object: ResponseObjectType;
  url: string;
  pages: ResponsePages;
  total_count: number;
  data_updated_at: string;
  data: Subject[];
  filters?: string;
}
