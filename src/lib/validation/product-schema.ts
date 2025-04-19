import { z } from 'zod';

export const productFields = z.object({
  name: z
    .string({ required_error: '상품명을 입력해주세요.' })
    .min(1, '상품명을 입력해주세요.')
    .max(20, '상품명은 20자 이내여야 합니다.'),
  scientificName: z
    .string({ required_error: '학명을 입력해주세요.' })
    .min(1, '학명을 입력해주세요.')
    .max(50, '학명은 50자 이내여야 합니다.')
    .regex(
      /^[a-zA-Z\s'\-]+$/,
      '학명에는 영어, 작은 따옴표, 하이픈, 공백만 허용됩니다.',
    ),
  description: z
    .string({ required_error: '상품 설명을 입력해주세요.' })
    .min(1, '상품 설명을 입력해주세요.')
    .max(100, '상품 설명은 100자 이내여야 합니다.'),
  origin: z
    .string({ required_error: '원산지를 입력해주세요.' })
    .min(1, '원산지를 입력해주세요.')
    .max(100, '원산지는 100자 이내여야 합니다.'),
  efficacy: z.string().max(100, '효능은 100자 이내여야 합니다.').optional(),
  warning: z.string().max(100, '주의사항은 100자 이내여야 합니다.').optional(),
  humidity: z
    .string({ required_error: '습도 정보를 입력해주세요.' })
    .min(1, '습도 정보를 입력해주세요.')
    .max(100, '습도 정보는 100자 이내여야 합니다.'),
  light: z
    .string({ required_error: '빛 정보를 입력해주세요.' })
    .min(1, '빛 정보를 입력해주세요.')
    .max(100, '빛 정보는 100자 이내여야 합니다.'),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: '가격은 숫자여야 합니다.',
        required_error: '가격을 입력해주세요.',
      })
      .positive('가격은 0보다 커야 합니다.')
      .max(1000000, '가격은 100만원 이하만 가능합니다.')
      .refine((val) => !/^0\d+/.test(String(val)), {
        message: '0으로 시작하는 가격은 사용할 수 없습니다.',
      }),
  ),
});

export const addProductSchema = productFields.refine(
  (data) => data.efficacy || data.warning,
  {
    message: '효능 또는 주의사항 중 하나는 필수입니다.',
    path: ['efficacy'],
  },
);

export const serverProductFields = productFields.extend({
  id: z.string(),
  tags: z.array(z.string()),
  filters: z.object({
    light: z.array(z.string()),
    size: z.array(z.string()),
    efficacy: z.array(z.string()),
    feature: z.array(z.string()),
    difficulty: z.string(),
    water: z.string(),
  }),
});

export const serverProductSchema = serverProductFields.refine(
  (data) => data.efficacy || data.warning,
  {
    message: '효능 또는 주의사항 중 하나는 필수입니다.',
    path: ['efficacy'],
  },
);
