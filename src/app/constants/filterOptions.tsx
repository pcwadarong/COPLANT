import { FilterState } from '@/types';

export const options: Record<
  keyof FilterState,
  { label: string; value: string }[]
> = {
  difficulty: [
    { label: '☆', value: '1' },
    { label: '☆☆', value: '2' },
  ],
  light: [
    { label: '양지', value: '양지' },
    { label: '반양지', value: '반양지' },
    { label: '반음지', value: '반음지' },
    { label: '음지', value: '음지' },
  ],
  water: [
    { label: '주 1~2회', value: 'week' },
    { label: '달 1~2회', value: 'month' },
    { label: '거의 필요 없음', value: 'rare' },
  ],
  size: [
    { label: '초소형', value: 'xs' },
    { label: '소형', value: 's' },
    { label: '중대형', value: 'm' },
  ],
  efficacy: [
    { label: '공기정화', value: 'purify' },
    { label: '미세먼지 제거', value: 'dust' },
    { label: '가습', value: 'humidify' },
  ],
  feature: [
    { label: '공중식물', value: 'air' },
    { label: '수경식물', value: 'water' },
    { label: '꽃이 피는', value: 'bloom' },
  ],
};
