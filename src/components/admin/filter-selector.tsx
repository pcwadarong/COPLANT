import CustomCheckbox from '@/components/common/checkbox';
import CustomRadio from '@/components/common/radio';

import { options } from '@/app/constants/filter-options';
import { FilterState } from '@/types';

interface FilterSelectorProps {
  filters: FilterState;
  onChange: (key: keyof FilterState, value: string, isMulti: boolean) => void;
}

const defaultFilters: FilterState = {
  difficulty: '',
  water: '',
  light: [],
  size: [],
  efficacy: [],
  feature: [],
};

export default function FilterSelector({
  filters,
  onChange,
}: FilterSelectorProps) {
  return (
    <fieldset>
      <legend className="font-semibold text-lg mb-2">필터</legend>
      {Object.entries(options).map(([key, { legend, items }]) => {
        const isMulti = Array.isArray(defaultFilters[key as keyof FilterState]);
        return (
          <div key={key} className="my-2">
            <p className="font-medium my-3">{legend}</p>
            <div className="flex flex-wrap gap-4">
              {items.map(({ label, value }) => {
                const inputId = `filter-${key}-${value}`;
                const inputName = `filter${
                  key.charAt(0).toUpperCase() + key.slice(1)
                }`;
                const isChecked = isMulti
                  ? filters?.[key as keyof FilterState]?.includes(value)
                  : filters?.[key as keyof FilterState] === value;

                const handleChange = () =>
                  onChange(key as keyof FilterState, value, isMulti);

                return isMulti ? (
                  <CustomCheckbox
                    key={value}
                    id={inputId}
                    name={inputName}
                    value={value}
                    label={label}
                    checked={isChecked}
                    onChange={handleChange}
                  />
                ) : (
                  <CustomRadio
                    key={value}
                    id={inputId}
                    name={inputName}
                    value={value}
                    label={label}
                    checked={isChecked}
                    onChange={handleChange}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
