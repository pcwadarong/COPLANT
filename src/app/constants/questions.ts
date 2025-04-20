export const questions = [
  {
    title: 'Q1. 어떤 공간에서 키우실 계획이에요?',
    key: 'light',
    style: {
      bgColor: 'bg-green-500',
      btnColor: 'bg-green-200',
      btnClickedColor: 'bg-green-600',
    },
    options: [
      { label: '햇빛이 하루 종일 잘 들어요 (창가, 베란다)', value: 'fullSun' },
      {
        label: '햇빛이 간접적으로 들어오는 창문 근처예요',
        value: 'partialSun',
      },
      { label: '햇빛은 없지만 방이 전반적으로 밝아요', value: 'partialShade' },
      { label: '창문이 거의 없고 어두운 편이에요', value: 'shade' },
    ],
  },
  {
    title: 'Q2. 사이즈는 어느 정도가 좋을까요?',
    key: 'size',
    style: {
      bgColor: 'bg-green-400',
      btnColor: 'bg-green-200',
      btnClickedColor: 'bg-green-600',
    },
    options: [
      { label: '책상 위에 둘 수 있는 아주 작은 식물', value: 'xs' },
      { label: '선반이나 협탁 위에 두기 좋은 크기', value: 's' },
      { label: '눈에 잘 띄는 중간 크기 식물', value: 'm' },
      { label: '공간을 채워주는 존재감 있는 대형 식물', value: 'l' },
    ],
  },
  {
    title: 'Q3. 물은 얼마나 자주 줄 수 있나요?',
    key: 'water',
    style: {
      bgColor: 'bg-green-200',
      btnColor: 'bg-white',
      btnClickedColor: 'bg-green-500',
    },
    options: [
      { label: '일주일에 한 번 이상 꼼꼼히 챙길 수 있어요', value: 'week' },
      { label: '가끔 한 번씩 주는 정도가 편해요', value: 'month' },
      { label: '거의 신경 못 써요, 알아서 버텨주면 좋아요', value: 'rare' },
    ],
  },
  {
    title: 'Q4. 어떤 효능이 있으면 좋겠나요?',
    key: 'efficacy',
    style: {
      bgColor: 'bg-green-100',
      btnColor: 'bg-white',
      btnClickedColor: 'bg-green-400',
    },
    options: [
      { label: '공기를 맑게 해주는 식물이면 좋겠어요', value: 'purify' },
      { label: '실내 습도를 높여주는 식물이요', value: 'humidify' },
      { label: '미세먼지 제거에 도움 되는 식물이요', value: 'dust' },
      { label: '특별한 기능은 없어도 괜찮아요', value: 'none' },
    ],
  },
  {
    title: 'Q5. 이런 식물이면 더 좋을 것 같아요!',
    key: 'feature',
    style: {
      bgColor: 'bg-apricot-200',
      btnColor: 'bg-white',
      btnClickedColor: 'bg-apricot-300',
    },
    options: [
      { label: '흙 없이 키우는 공중식물이 궁금해요', value: 'air' },
      { label: '물 속에서 자라는 식물이 좋아요', value: 'water' },
      { label: '잎이 늘어져서 매달 수 있는 식물이 좋아요', value: 'vine' },
      { label: '꽃이 피는 예쁜 식물을 원해요', value: 'bloom' },
      { label: '이런 건 중요하지 않아요', value: 'none' },
    ],
  },
];
