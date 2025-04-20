import { ProductFormState } from '@/types';
import { LabeledInput, LabeledTextarea } from '@/components/common/label-input';

interface Props {
  form: ProductFormState;
  errors: Partial<Record<keyof ProductFormState, string>>;
  onChange: (
    field: keyof ProductFormState,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isEditMode?: boolean;
}

export default function ProductFormFields({
  form,
  errors,
  onChange,
  isEditMode,
}: Props) {
  return (
    <>
      <LabeledInput
        id="name"
        label="상품명"
        value={form.name}
        onChange={onChange('name')}
        required
        error={errors.name}
      />
      <LabeledInput
        id="scientificName"
        label="학명"
        value={form.scientificName}
        onChange={onChange('scientificName')}
        required
        error={errors.scientificName}
        disabled={isEditMode}
      />
      <LabeledTextarea
        id="description"
        label="상품 설명"
        value={form.description}
        onChange={onChange('description')}
        required
        error={errors.description}
      />
      <LabeledInput
        id="price"
        label="상품 가격"
        value={form.price}
        onChange={onChange('price')}
        type="number"
        required
        error={errors.price}
      />
      <LabeledTextarea
        id="origin"
        label="원산지"
        value={form.origin}
        onChange={onChange('origin')}
        required
        error={errors.origin}
      />
      <LabeledTextarea
        id="efficacy"
        label="효능"
        placeholder="효능과 주의사항 중 한 가지만 입력해주세요."
        value={form.efficacy}
        onChange={onChange('efficacy')}
        error={errors.efficacy}
      />
      <LabeledTextarea
        id="warning"
        label="주의사항"
        value={form.warning}
        placeholder="효능과 주의사항 중 한 가지만 입력해주세요."
        onChange={onChange('warning')}
        error={errors.warning}
      />
      <LabeledTextarea
        id="humidity"
        label="습도"
        value={form.humidity}
        onChange={onChange('humidity')}
        required
        error={errors.humidity}
      />
      <LabeledTextarea
        id="light"
        label="빛"
        value={form.light}
        onChange={onChange('light')}
        required
        error={errors.light}
      />
      <LabeledTextarea
        id="temperature"
        label="온도"
        value={form.temperature}
        onChange={onChange('temperature')}
        required
        error={errors.temperature}
      />
      <LabeledTextarea
        id="watering"
        label="물 주기"
        value={form.watering}
        onChange={onChange('watering')}
        required
        error={errors.watering}
      />
      <input type="hidden" name="id" value={form.id} />
    </>
  );
}
