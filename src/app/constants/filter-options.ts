import { FilterState } from '@/types';

export const options: Record<
  keyof FilterState,
  {
    legend: string;
    items: { label: string; value: string }[];
  }
> = {
  difficulty: {
    legend: '난이도',
    items: [
      { label: '☆', value: '1' },
      { label: '☆☆', value: '2' },
    ],
  },
  light: {
    legend: '빛',
    items: [
      { label: '양지', value: 'fullSun' },
      { label: '반양지', value: 'partialSun' },
      { label: '반음지', value: 'partialShade' },
      { label: '음지', value: 'shade' },
    ],
  },
  water: {
    legend: '물 주기',
    items: [
      { label: '주 1~2회', value: 'week' },
      { label: '달 1~2회', value: 'month' },
      { label: '거의 필요 없음', value: 'rare' },
    ],
  },
  size: {
    legend: '크기',
    items: [
      { label: '초소형', value: 'xs' },
      { label: '소형', value: 's' },
      { label: '중형', value: 'm' },
      { label: '대형', value: 'l' },
    ],
  },
  efficacy: {
    legend: '효능',
    items: [
      { label: '공기정화', value: 'purify' },
      { label: '미세먼지 제거', value: 'dust' },
      { label: '가습', value: 'humidify' },
    ],
  },
  feature: {
    legend: '특징',
    items: [
      { label: '공중식물', value: 'air' },
      { label: '수경식물', value: 'water' },
      { label: '덩쿨', value: 'vine' },
      { label: '꽃이 피는', value: 'bloom' },
    ],
  },
};
