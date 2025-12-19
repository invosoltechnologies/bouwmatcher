import Image from 'next/image';
import { ValueItem } from './Values';

const defaultValuesData: ValueItem[] = [
  {
    id: 1,
    icon: '/icons/values/Betrouwbaarheid.svg',
    title: 'Betrouwbaarheid',
    description: 'Wij staan voor heldere contracten zonder verborgen valkuilen of hoge opslagkosten.',
    position: 'top-left'
  },
  {
    id: 2,
    icon: '/icons/values/Transparantie.svg',
    title: 'Transparantie',
    description: 'Ontvang je geen leuk? Dan betaal je ook niets. Zo weet je altijd waar je aan toe bent.',
    position: 'top-right'
  },
  {
    id: 3,
    icon: '/icons/values/Eerlijkheid.svg',
    title: 'Eerlijkheid',
    description: 'Geen loze beloftes of waargaranties. Bij ons sta jij altijd centraal.',
    position: 'bottom-left'
  },
  {
    id: 4,
    icon: '/icons/values/Doelgericht.svg',
    title: 'Doelgericht',
    description: 'Vertel ons wat je zoekt, wij regelen de rest. Het gemak van een betrouwbare bouwpartner.',
    position: 'bottom-right'
  }
];

interface ValuesShapeProps {
  values?: ValueItem[];
  centerText?: string;
}

export default function ValuesShape({ values, centerText = 'Jouw zekerheid\nin de bouw.' }: ValuesShapeProps) {
  const valuesData = values || defaultValuesData;
  const getInvertedRadiusMask = (position: string) => {
    const borderRadius = '10px'; // Corner radius of the cards
    const cutoutDepth = '100px'; // How deep the curved cutout goes into the card
    const cutoutLengthHorizontal = '20px'; // How far the cutout extends horizontally
    const cutoutLengthVertical = '20px'; // How far the cutout extends vertically

    const baseMask = `calc(2*${borderRadius}) calc(2*${borderRadius}) radial-gradient(#000 70%,#0000 72%)`;
    const totalCutoutSize = `(${cutoutDepth} + ${borderRadius})`; // Combined size for positioning calculations

    switch (position) {
      case 'top-left':
        return {
          mask: `calc(100% - ${totalCutoutSize} - ${cutoutLengthHorizontal}) 100% /${baseMask}, 100% calc(100% - ${totalCutoutSize} - ${cutoutLengthVertical}) /${baseMask}, radial-gradient(${cutoutDepth} at 100% 100%,#0000 99%,#000 calc(100% + 1px)) calc(-1*${borderRadius} - ${cutoutLengthHorizontal}) calc(-1*${borderRadius} - ${cutoutLengthVertical}), conic-gradient(from 90deg at calc(100% - ${borderRadius}) calc(100% - ${borderRadius}),#0000 25%,#000 0) calc(-1*${totalCutoutSize} - ${cutoutLengthHorizontal}) 0, conic-gradient(from 90deg at calc(100% - ${borderRadius}) calc(100% - ${borderRadius}),#0000 25%,#000 0) 0 calc(-1*${totalCutoutSize} - ${cutoutLengthVertical})`,
          maskRepeat: 'no-repeat'
        };
      case 'top-right':
        return {
          mask: `calc(${totalCutoutSize} + ${cutoutLengthHorizontal}) 100% /${baseMask}, 0 calc(100% - ${totalCutoutSize} - ${cutoutLengthVertical}) /${baseMask}, radial-gradient(${cutoutDepth} at 0 100%,#0000 99%,#000 calc(100% + 1px)) calc(${borderRadius} + ${cutoutLengthHorizontal}) calc(-1*${borderRadius} - ${cutoutLengthVertical}), conic-gradient(from 180deg at ${borderRadius} calc(100% - ${borderRadius}),#0000 25%,#000 0) calc(${totalCutoutSize} + ${cutoutLengthHorizontal}) 0, conic-gradient(from 180deg at ${borderRadius} calc(100% - ${borderRadius}),#0000 25%,#000 0) 0 calc(-1*${totalCutoutSize} - ${cutoutLengthVertical})`,
          maskRepeat: 'no-repeat'
        };
      case 'bottom-left':
        return {
          mask: `calc(100% - ${totalCutoutSize} - ${cutoutLengthHorizontal}) 0 /${baseMask}, 100% calc(${totalCutoutSize} + ${cutoutLengthVertical}) /${baseMask}, radial-gradient(${cutoutDepth} at 100% 0,#0000 99%,#000 calc(100% + 1px)) calc(-1*${borderRadius} - ${cutoutLengthHorizontal}) calc(${borderRadius} + ${cutoutLengthVertical}), conic-gradient(at calc(100% - ${borderRadius}) ${borderRadius},#0000 25%,#000 0) calc(-1*${totalCutoutSize} - ${cutoutLengthHorizontal}) 0, conic-gradient(at calc(100% - ${borderRadius}) ${borderRadius},#0000 25%,#000 0) 0 calc(${totalCutoutSize} + ${cutoutLengthVertical})`,
          maskRepeat: 'no-repeat'
        };
      case 'bottom-right':
        return {
          mask: `calc(${totalCutoutSize} + ${cutoutLengthHorizontal}) 0 /${baseMask}, 0 calc(${totalCutoutSize} + ${cutoutLengthVertical}) /${baseMask}, radial-gradient(${cutoutDepth} at 0 0,#0000 99%,#000 calc(100% + 1px)) calc(${borderRadius} + ${cutoutLengthHorizontal}) calc(${borderRadius} + ${cutoutLengthVertical}), conic-gradient(at ${borderRadius} ${borderRadius},#000 75%,#0000 0) calc(${totalCutoutSize} + ${cutoutLengthHorizontal}) 0, conic-gradient(at ${borderRadius} ${borderRadius},#000 75%,#0000 0) 0 calc(${totalCutoutSize} + ${cutoutLengthVertical})`,
          maskRepeat: 'no-repeat'
        };
      default:
        return {};
    }
  };

  return (
    <>
      {/* Mobile Layout - Simple Cards (Below lg) */}
      <div className='lg:hidden'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto px-4'>
          {valuesData.map((value) => (
            <div
              key={value.id}
              className='rounded-2xl p-6 flex flex-col gap-3'
              style={{
                background:
                  value.id % 2 === 0
                    ? 'linear-gradient(90deg, rgba(10, 178, 126, 0.25) 0%, rgba(2, 58, 162, 0.25) 100%)'
                    : 'linear-gradient(90deg, rgba(2, 58, 162, 0.25) 0%, rgba(10, 178, 126, 0.25) 100%)',
                boxShadow: '0px 16px 40px #2929291F',
              }}
            >
              <div className='flex items-center justify-center mb-2'>
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={60}
                  height={60}
                  className='w-[60px] h-[60px]'
                />
              </div>
              <h3 className='text-xl font-bold text-slate-900 text-center'>
                {value.title}
              </h3>
              <p className='text-sm text-slate-900 leading-relaxed text-center'>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Shape with Center Circle (lg and above) */}
      <div className='hidden lg:flex relative justify-center items-center max-w-4xl mx-auto px-4'>
        {/* Cards Grid */}
        <div className='grid grid-cols-2 gap-x-[35px] gap-y-[27px] relative z-10'>
          {valuesData.map((value) => {
            const isBottomCard = value.position.includes('bottom');
            const maskStyle = getInvertedRadiusMask(value.position);

            return (
              <div
                key={value.id}
                className={`relative w-[333px] h-[291px] rounded-[20px] p-5 flex flex-col gap-0.5 transition-all duration-300 ease-in-out cursor-pointer ${
                  isBottomCard ? 'flex-col-reverse' : ''
                } ${value.id % 2 === 0 ? 'items-end' : 'items-start'} ${
                  value.position === 'top-left'
                    ? 'hover:scale-110 hover:-translate-x-6 hover:-translate-y-6'
                    : value.position === 'top-right'
                    ? 'hover:scale-110 hover:translate-x-6 hover:-translate-y-6'
                    : value.position === 'bottom-left'
                    ? 'hover:scale-110 hover:-translate-x-6 hover:translate-y-6'
                    : 'hover:scale-110 hover:translate-x-6 hover:translate-y-6'
                }`}
                style={{
                  background:
                    value.id % 2 === 0
                      ? 'linear-gradient(90deg, rgba(10, 178, 126, 0.25) 0%, rgba(2, 58, 162, 0.25) 100%)'
                      : 'linear-gradient(90deg, rgba(2, 58, 162, 0.25) 0%, rgba(10, 178, 126, 0.25) 100%)',
                  filter: 'drop-shadow(0px 16px 40px #2929291F)',
                  ...maskStyle,
                }}
              >
                {/* Content based on position */}
                {/* Icon and Title Row */}
                <div
                  className={`flex items-center gap-3 mb-4 ${
                    value.id % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Image
                    src={value.icon}
                    alt={value.title}
                    width={76}
                    height={76}
                    className='w-[76px] h-[76px]'
                  />

                  <h3 className='text-[26px] font-bold text-slate-900'>
                    {value.title}
                  </h3>
                </div>
                {/* Description */}
                <p
                  className={`text-sm text-slate-900 leading-relaxed max-w-46 text-wrap ${
                    value.id % 2 === 0 ? 'text-right' : 'text-left'
                  }  `}
                >
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Center Circle */}

        <div
          className='absolute inset-0 w-[231px] h-[231px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 rounded-full border border-gray-200 '
          style={{
            background:
              'linear-gradient(90deg, rgba(2, 58, 162, 0.34) 0%, #0AB27E 50%, rgba(2, 58, 162, 0.23) 100%)',
          }}
        ></div>
        <div className='absolute inset-0 w-[231px] h-[231px] z-10 bg-white/60 backdrop:blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full'></div>
        <div
          className='absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/85 rounded-full flex items-center justify-center opacity-100'
          style={{
            width: '176px',
            height: '176px',
            boxShadow: '0px 10px 15px 0px #0000001A',
          }}
        >
          <div className='text-center text-white p-6'>
            <p className='text-lg font-medium leading-tight whitespace-pre-line'>
              {centerText}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}