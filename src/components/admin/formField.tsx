import { ProductFormState } from '@/types';
import { LabeledInput, LabeledTextarea } from '@/components/common/labelInput';

interface Props {
  form: ProductFormState;
  onChange: (
    field: keyof ProductFormState,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ProductFormFields({ form, onChange }: Props) {
  return (
    <>
      <LabeledInput
        id="name"
        label="상품명"
        value={form.name}
        onChange={onChange('name')}
        required
      />
      <LabeledInput
        id="scientificName"
        label="학명"
        value={form.scientificName}
        onChange={onChange('scientificName')}
        required
      />
      <LabeledTextarea
        id="description"
        label="상품 설명"
        value={form.description}
        onChange={onChange('description')}
        required
      />
      <LabeledInput
        id="price"
        label="상품 가격"
        value={form.price}
        onChange={onChange('price')}
        type="number"
        required
      />
      <LabeledTextarea
        id="origin"
        label="원산지"
        value={form.origin}
        onChange={onChange('origin')}
        required
      />
      <LabeledTextarea
        id="efficacy"
        label="효능"
        placeholder="효능과 주의사항 중 한 가지만 입력해주세요."
        value={form.efficacy}
        onChange={onChange('efficacy')}
      />
      <LabeledTextarea
        id="warning"
        label="주의사항"
        value={form.warning}
        placeholder="효능과 주의사항 중 한 가지만 입력해주세요."
        onChange={onChange('warning')}
      />
      <LabeledTextarea
        id="humidity"
        label="습도"
        value={form.humidity}
        onChange={onChange('humidity')}
        required
      />
      <LabeledTextarea
        id="light"
        label="빛"
        value={form.light}
        onChange={onChange('light')}
        required
      />
    </>
  );
}
