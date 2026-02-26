// BGMI Tournament Platform - Game Configuration
// All static game data for tournament creation

// ─── Tournament Types ────────────────────────────────────────────────────────

export type TournamentType = "Classic" | "TDM" | "WOW";

export const TOURNAMENT_TYPES: TournamentType[] = ["Classic", "TDM", "WOW"];

// ─── Classic Mode ────────────────────────────────────────────────────────────

export type GameMode = "Solo" | "Duo" | "Squad";
export type ClassicMap = "Erangel" | "Miramar" | "Rondo";

export const GAME_MODES: GameMode[] = ["Solo", "Duo", "Squad"];
export const CLASSIC_MAPS: ClassicMap[] = ["Erangel", "Miramar", "Rondo"];

// ─── TDM Mode ────────────────────────────────────────────────────────────────

export type GunCategory =
  | "AR"
  | "SMG"
  | "Shotgun"
  | "Pistol"
  | "Sniper"
  | "LMG"
  | "DMR";

export const GUN_CATEGORIES: GunCategory[] = [
  "AR",
  "SMG",
  "Shotgun",
  "Pistol",
  "Sniper",
  "LMG",
  "DMR",
];

export const GUNS_BY_CATEGORY: Record<GunCategory, string[]> = {
  AR: [
    "M416",
    "SCAR-L",
    "M762",
    "AKM",
    "Beryl M762",
    "MK47 Mutant",
    "G36C",
    "QBZ95",
  ],
  SMG: [
    "UMP45",
    "PP-19 Bizon",
    "MP5K",
    "Vector",
    "Tommy Gun",
    "Micro UZI",
    "P90",
  ],
  Shotgun: ["S12K", "S1897", "DBS", "S686"],
  Pistol: ["P92", "P1911", "Desert Eagle", "R1895", "Flare Gun"],
  Sniper: ["AWM", "M24", "Kar98k", "Win94", "Mosin Nagant"],
  LMG: ["M249", "DP-28", "MG3"],
  DMR: ["Mini 14", "VSS", "SKS", "MK14", "SLR", "QBU"],
};

// ─── WOW Mode ────────────────────────────────────────────────────────────────

export type WOWMode = "1v1" | "2v2" | "3v3" | "4v4" | "5v5";

export const WOW_MODES: WOWMode[] = ["1v1", "2v2", "3v3", "4v4", "5v5"];

// ─── Common ──────────────────────────────────────────────────────────────────

export type RoomType = "Public" | "Private";

export const ROOM_TYPES: RoomType[] = ["Public", "Private"];
