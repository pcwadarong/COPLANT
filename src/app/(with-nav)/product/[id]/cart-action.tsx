import Counter from '@/components/common/counter';
import CustomButton from '@/components/common/button';

export default function CartAction({
  price = 0,
  isMobile = false,
}: {
  price?: number;
  isMobile?: boolean;
}) {
  return (
    <div className={isMobile ? 'block sm:hidden mt-10' : 'hidden sm:block'}>
      <p className="mb-4 font-bold text-xl">{`${price} 원`}</p>
      <div className={`flex gap-2 ${isMobile ? 'items-center' : 'flex-col'}`}>
        <Counter />
        <CustomButton
          className={`bg-stone-800 text-white text-sm ${!isMobile && 'mt-4'}`}
        >
          카트에 담기
        </CustomButton>
      </div>
      {isMobile && <hr className="border mt-5 mb-10" />}
    </div>
  );
}
