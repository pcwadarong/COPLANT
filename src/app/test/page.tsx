'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '../constants/questions';
import CustomButton from '@/components/common/button';

const QuestionStep = ({
  title,
  options,
  onChange,
  selectedValues,
  btnColor,
  btnClickedColor,
}: {
  title: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  selectedValues: string[];
  btnColor: string;
  btnClickedColor: string;
}) => (
  <div>
    <p className="mb-4 text-stone-700">
      나와 딱 맞는 소울 메이트를 찾아보세요!
    </p>
    <h1 className="text-3xl font-bold mb-6">{title}</h1>
    <ul className="flex flex-col gap-3">
      {options.map((item) => (
        <CustomButton
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`hover:bg-white ${
            selectedValues.includes(item.value) ? btnClickedColor : btnColor
          }`}
        >
          {item.label}
        </CustomButton>
      ))}
    </ul>
  </div>
);

export default function TestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
  const [step, setStep] = useState(0);

  const current = questions[step];
  const { bgColor, btnColor, btnClickedColor } = current.style;

  const selectedValues = answers[current.key] || [];

  const onChange = (value: string) => {
    const key = current.key;
    const prevValues = answers[key] || [];
    const isSelected = prevValues.includes(value);

    setAnswers((prev) => ({
      ...prev,
      [key]: isSelected
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value],
    }));
  };

  const progressPercent = ((step + 1) / questions.length) * 100;

  return (
    <main
      className={`w-full h-screen flex flex-col items-center justify-center ${bgColor}`}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-stone-200">
        <div
          className="h-full bg-stone-800 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <QuestionStep
        title={current.title}
        options={current.options}
        onChange={onChange}
        selectedValues={selectedValues}
        btnColor={btnColor}
        btnClickedColor={btnClickedColor}
      />
      <div className="flex justify-center mt-20 gap-4">
        {step !== 0 && (
          <CustomButton
            onClick={() => setStep(step - 1)}
            className={`hover:bg-white ${
              step >= 3 ? 'text-black' : 'text-white'
            } hover:text-black ${btnClickedColor}`}
          >
            &lt; 이전으로
          </CustomButton>
        )}
        {step < questions.length - 1 ? (
          <CustomButton
            onClick={() => selectedValues.length > 0 && setStep(step + 1)}
            disabled={selectedValues.length === 0}
            className={`hover:bg-white ${
              step >= 3 ? 'text-black' : 'text-white'
            } hover:text-black ${btnClickedColor} ${
              selectedValues.length === 0 && 'opacity-50 cursor-not-allowed'
            }`}
          >
            다음으로 &gt;
          </CustomButton>
        ) : (
          <CustomButton
            onClick={() =>
              selectedValues.length > 0 && router.push('/test/result')
            }
            disabled={selectedValues.length === 0}
            className={`hover:bg-white text-black ${btnClickedColor} ${
              selectedValues.length === 0 && 'opacity-50 cursor-not-allowed'
            }`}
          >
            결과 보기
          </CustomButton>
        )}
      </div>
    </main>
  );
}
