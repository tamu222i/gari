/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClientRequest } from '../types';

export const CLIENT_REQUESTS: ClientRequest[] = [
  {
    id: 'client_yume',
    clientName: 'ゆめちゃん',
    hairLength: 'medium',
    hairColor: '#5D4037', // Chiffon chocolate
    eyeColor: '#795548',
    outfitColor: '#F8BBD0', // Pastel strawberry
    speechText: 'ふんわりツインおだんごでおでかけしたいな♪ かわいいピンクリボンもつけてね！',
    nuanceLabel: 'ふんわりキュート',
    targetKeywords: ['おだんご', 'ツイン（りょうがわ）', 'リボン'],
    rules: {
      targetPartCategory: 'bun',
      targetAccessoryCategory: 'ribbon',
      requireSymmetry: true,
      idealPartCount: { min: 2, max: 4 },
      idealAccessoryCount: { min: 1, max: 4 },
      targetNuance: 'cute_fluffy',
    },
    avatarMood: 'excited',
  },
  {
    id: 'client_luna',
    clientName: 'るなちゃん',
    hairLength: 'long',
    hairColor: '#D1C4E9', // Lavender mist
    eyeColor: '#5E35B1',
    outfitColor: '#EDE7F6', // Princess lilac
    speechText: 'あこがれのプリンセスになりたいの♡ みつあみとキラキラのティアラでおひめさまにして！',
    nuanceLabel: 'おひめさまプリンセス',
    targetKeywords: ['みつあみ', 'ティアラ', 'キラキラ'],
    rules: {
      targetPartCategory: 'braid',
      targetAccessoryCategory: 'tiara',
      requireSymmetry: false,
      idealPartCount: { min: 1, max: 3 },
      idealAccessoryCount: { min: 1, max: 3 },
      targetNuance: 'princess',
    },
    avatarMood: 'dreamy',
  },
  {
    id: 'client_aoi',
    clientName: 'あおいちゃん',
    hairLength: 'short',
    hairColor: '#263238', // Deep midnight
    eyeColor: '#0277BD',
    outfitColor: '#B3E5FC', // Sky pastel
    speechText: 'ショートヘアにすずしげなヘアピンでおとなっぽくしてほしいな☆ きらきら星もつけたい！',
    nuanceLabel: 'すずしげ＆おとなっぽ',
    targetKeywords: ['ヘアピン', '星のきらきら', 'おとなっぽ'],
    rules: {
      targetAccessoryCategory: 'pin',
      requireSymmetry: false,
      idealPartCount: { min: 0, max: 2 },
      idealAccessoryCount: { min: 2, max: 5 },
      targetNuance: 'cool_stylish',
    },
    avatarMood: 'smiling',
  },
  {
    id: 'client_himari',
    clientName: 'ひまりちゃん',
    hairLength: 'bob',
    hairColor: '#FFB74D', // Honey apricot
    eyeColor: '#F57C00',
    outfitColor: '#FFF9C4', // Sunshine yellow
    speechText: 'げんきいっぱいなツインテールがいいな！カラフルなお星さまピンもいっぱいかざってね！',
    nuanceLabel: 'ポップ＆げんき',
    targetKeywords: ['ツインテール', 'お星さまピン', 'げんき'],
    rules: {
      targetPartCategory: 'tail',
      targetAccessoryCategory: 'pin',
      requireSymmetry: true,
      idealPartCount: { min: 2, max: 2 },
      idealAccessoryCount: { min: 1, max: 4 },
      targetNuance: 'pop_genki',
    },
    avatarMood: 'excited',
  },
  {
    id: 'client_sakura',
    clientName: 'さくらちゃん',
    hairLength: 'long',
    hairColor: '#F48FB1', // Sakura blossom
    eyeColor: '#C2185B',
    outfitColor: '#FCE4EC', // Rose cream
    speechText: 'お花がいっぱい咲いたみたいなハーフアップ！サイドにおだんごとお花をつけてほしいな♪',
    nuanceLabel: 'ふんわりキュート',
    targetKeywords: ['サイドおだんご', 'お花', 'ハーフアップ'],
    rules: {
      targetPartCategory: 'bun',
      targetAccessoryCategory: 'flower',
      requireSymmetry: false,
      idealPartCount: { min: 1, max: 3 },
      idealAccessoryCount: { min: 1, max: 5 },
      targetNuance: 'cute_fluffy',
    },
    avatarMood: 'smiling',
  },
  {
    id: 'client_miu',
    clientName: 'みうちゃん',
    hairLength: 'bob',
    hairColor: '#A1887F', // Milk tea beige
    eyeColor: '#4E342E',
    outfitColor: '#E0F2F1', // Mint ribbon dress
    speechText: 'かわいいリボンとお花のダブルアレンジ！きょうは特別なパーティーにいきたいな♡',
    nuanceLabel: 'きらきらパーティー',
    targetKeywords: ['リボン', 'お花', 'パーティー'],
    rules: {
      targetAccessoryCategory: 'ribbon',
      requireSymmetry: false,
      idealPartCount: { min: 0, max: 3 },
      idealAccessoryCount: { min: 2, max: 6 },
      targetNuance: 'party',
    },
    avatarMood: 'shy',
  },
  {
    id: 'client_kirari',
    clientName: 'きらりちゃん',
    hairLength: 'medium',
    hairColor: '#FF80AB', // Pop neon pink
    eyeColor: '#00BCD4', // Sparkling aqua
    outfitColor: '#FF4081', // Pop berry
    speechText: 'げんきいっぱいなポップさと、キラキラかわいいガーリーをミックスしたアイドルスタイルにしてほしいな☆ 星ピンとツインテールでステージで一番かがやきたいの！',
    nuanceLabel: 'げんきポップ＆キラキラガーリー',
    targetKeywords: ['ツインテール', 'お星さまピン', 'キラキラリボン'],
    rules: {
      targetPartCategory: 'tail',
      targetAccessoryCategory: 'pin',
      secondaryAccessoryCategory: 'ribbon',
      requireSymmetry: true,
      idealPartCount: { min: 2, max: 2 },
      idealAccessoryCount: { min: 2, max: 5 },
      targetNuance: 'pop_girly',
    },
    avatarMood: 'excited',
  },
];

export function getClientRequests(): ClientRequest[] {
  return CLIENT_REQUESTS;
}

export function getClientById(id: string): ClientRequest | undefined {
  return CLIENT_REQUESTS.find(client => client.id === id);
}

export function getRandomClient(excludeId?: string): ClientRequest {
  const pool = excludeId
    ? CLIENT_REQUESTS.filter(c => c.id !== excludeId)
    : CLIENT_REQUESTS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
